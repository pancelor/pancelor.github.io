to generate these videos, I used variations of this command:

$ ffmpeg.exe -i escalatorworld.flv -ss 00:48.0 -t 00:6 -filter:v scale=480x270 -crf 28 -an out.mp4

-crf is a quality thing
-an kills any audio
-ss is start time
-t is length
