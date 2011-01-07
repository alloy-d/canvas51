#!/usr/bin/env ruby

infile = File.new("index.html", "r")
outfile = File.new("big.html", "w")

while line = infile.gets do
  /<link rel="stylesheet" href="([^"]+)"/.match(line) do |m|
    STDERR.puts "stylesheet #{m[1]}"
    outfile.puts "<style>"
    File.open(m[1], "r") do |f|
      while tline = f.gets do
        outfile.puts tline
      end
    end
    outfile.puts "</style>"
    line = ""
  end

  /<script src="([^"]+)"/.match(line) do |m|
    STDERR.puts "script #{m[1]}"
    outfile.puts "<script>"
    File.open(m[1], "r") do |f|
      while tline = f.gets do
        outfile.puts tline
      end
    end
    outfile.puts "</script>"
    line = ""
  end

  outfile.puts line
end

