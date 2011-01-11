#!/usr/bin/env ruby

infile = File.new("index.html", "r")
outfile = File.new("big.html", "w")
mapfile = File.new("misc/urls", "r")
map = {}

while line = mapfile.gets do
  parts = line.split(" ")
  map[parts[0]] = parts[1]
end

line = infile.gets
outfile.puts line
outfile.puts "<!-- Made by Adam Lloyd (adam@alloy-d.net) for Sophie, one of the awesomest people in the world. -->"
outfile.puts "<!-- Don't look at this. Check out http://github.com/alloy-d/canvas51/ instead. -->"


while line = infile.gets do
  /<link rel="stylesheet" href="([^"]+)"/.match(line) do |m|
    STDERR.puts "stylesheet #{m[1]}"
    outfile.puts "<style><!-- file: #{m[1]} -->"
    File.open(m[1], "r") do |f|
      while tline = f.gets do
        /url\('([^']+)'\)/.match(tline) do |m|
          if map.include? m[1] then
            tline.gsub!(m[1], map[m[1]])
          end
        end
        outfile.puts tline
      end
    end
    outfile.puts "</style><!-- end file: #{m[1]} -->"
    line = ""
  end

  /<script src="([^"]+)"/.match(line) do |m|
    STDERR.print "script #{m[1]}"
    if map.include? m[1] then
      STDERR.puts " --> mapped!"
      line.gsub!(m[1], map[m[1]])
    else
      STDERR.puts " --> inlined"
      outfile.puts "<script><!-- file: #{m[1]} -->"
      File.open(m[1], "r") do |f|
        while tline = f.gets do
          outfile.puts tline
        end
      end
      outfile.puts "</script><!-- end file: #{m[1]} -->"
      line = ""
    end
  end

  /<audio .*src="([^"]+)"/.match(line) do |m|
    STDERR.print "audio #{m[1]}"
    if map.include? m[1] then
      STDERR.puts " --> mapped!"
      line.gsub!(m[1], map[m[1]])
    else
      STDERR.puts " --> missing! :-("
    end
    outfile.puts
  end

  outfile.puts line
end

