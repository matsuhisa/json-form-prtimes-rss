mv src/tmp/*.jpg src/image
mogrify -path src/image/ -format jpg src/tmp/*.png
mogrify src/image/*.jpg -strip -quality 30 -colorspace sRGB
# rm -rf src/tmp
