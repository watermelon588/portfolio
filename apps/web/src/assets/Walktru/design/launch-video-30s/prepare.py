"""Copy original assets; extract real demo frames; synthesize an original score."""
from pathlib import Path
import json, shutil, subprocess, wave
import numpy as np

ROOT=Path(__file__).resolve().parent
DESIGN=ROOT.parent
SHARED=DESIGN/'launch-videos'/'shared'
ASSETS=ROOT/'assets'
FFMPEG=Path('C:/ffmpeg-8.1-essentials_build/bin/ffmpeg.exe')
ASSETS.mkdir(exist_ok=True)
provenance=[]
for row in json.loads((DESIGN/'doodle-posters'/'asset-manifest.json').read_text()):
    key=row['key']; source=DESIGN.parent/row['source']
    dest=ASSETS/(key+source.suffix)
    shutil.copyfile(source,dest)
    provenance.append({'asset':dest.name,'source':str(source)})
for filename in ['journey-cutouts.png','curiosity-cutouts.png']:
    source=DESIGN/'doodle-posters'/'assets'/filename
    shutil.copyfile(source,ASSETS/filename)
    provenance.append({'asset':filename,'source':str(source)})
for name in ['geist','geist-mono']:
    source=DESIGN.parent/'node_modules'/'@fontsource-variable'/name
    shutil.copyfile(source/'files'/f'{name}-latin-wght-normal.woff2',ASSETS/(name+'.woff2'))
    shutil.copyfile(source/'LICENSE',ASSETS/(name+'-LICENSE.txt'))
shutil.copyfile(DESIGN.parent/'node_modules'/'gsap'/'dist'/'gsap.min.js',ASSETS/'gsap.min.js')
for sub,name in [('scout','scout-strip-ink.png'),('scout','scout-still-ink.png'),('img/stills','fixes.jpg'),('img/stills','ext-report.jpg'),('img/screens','security.jpg'),('img/screens','seo.jpg')]:
    source=SHARED/sub/name
    shutil.copyfile(source,ASSETS/name)
    provenance.append({'asset':name,'source':str(source)})
for name,start,duration in [('run',1.0,5.0),('report',0.0,2.4)]:
    dest=ASSETS/(name+'-frames');dest.mkdir(exist_ok=True)
    source=SHARED/'clips'/(name+'.mp4')
    filters='fps=30,'+('drawbox=x=30:y=680:w=300:h=70:color=0xf4f4f5:t=fill,' if name=='run' else '')+'scale=1280:-2'
    subprocess.run([str(FFMPEG),'-v','error','-y','-ss',str(start),'-i',str(source),'-t',str(duration),'-vf',filters,'-q:v','2',str(dest/'%04d.jpg')],check=True)
    provenance.append({'asset':name+'-frames','source':str(source),'source_start':start,'seconds':duration,'fps':30})
(ROOT/'asset-provenance.json').write_text(json.dumps(provenance,indent=2))

# Original 120 BPM electro-organic soundtrack, fixed seed, authored for these cuts.
SR=48000; LENGTH=30; count=SR*LENGTH
left=np.zeros(count);right=np.zeros(count);rng=np.random.default_rng(20261001)
def add(sound,time,gain=1,pan=0):
    index=round(time*SR);end=min(count,index+len(sound))
    if end<=index:return
    s=sound[:end-index]*gain
    left[index:end]+=s*np.sqrt((1-pan)/2);right[index:end]+=s*np.sqrt((1+pan)/2)
def tone(freq,dur,kind='sine'):
    t=np.arange(int(SR*dur))/SR
    if kind=='bell':y=np.sin(2*np.pi*freq*t)+.32*np.sin(2*np.pi*2.002*freq*t)+.11*np.sin(2*np.pi*3.99*freq*t)
    else:y=np.sin(2*np.pi*freq*t)+.14*np.sin(2*np.pi*2*freq*t)
    return y*np.minimum(t/.012,1)*np.exp(-t/(dur*.38))
for beat in range(60):
    at=beat*.5
    t=np.arange(int(SR*.24))/SR
    phase=2*np.pi*(48*t+115*.024*(1-np.exp(-t/.024)))
    add(np.sin(phase)*np.exp(-t/0.075),at,.39)
    if beat%2:
        t=np.arange(int(SR*.12))/SR;n=rng.standard_normal(len(t));n=np.concatenate(([0],np.diff(n)))
        add(n*np.exp(-t/.029),at,.036,.15)
    if beat<54:
        notes=[55,65.406,73.416,65.406];add(tone(notes[(beat//4)%4],.38),at,.15)
for tick in range(116):
    at=tick*.25+.125;t=np.arange(int(SR*.047))/SR;n=rng.standard_normal(len(t));n=np.concatenate(([0],np.diff(n)))
    add(n*np.exp(-t/.009),at,.012,(-.42 if tick%2 else .42))
notes=[220,261.626,329.628,392,329.628,261.626,293.665,349.228]
for k in range(56):
    add(tone(notes[k%8]*2,.58,'bell'),1+k*.5,.033,(-.3 if k%2 else .3))
for at in [2.8,5.8,10.8,14.8,18.8,22.8,25.8]:
    t=np.arange(int(SR*.45))/SR;noise=rng.standard_normal(len(t));noise=np.convolve(noise,np.ones(9)/9,mode='same')
    env=np.sin(np.pi*t/.45)**2
    add(noise*env,at,.065,-.12)
for at in [3,6,11,15,19,23,26]:
    add(tone(880,.24,'bell'),at,.042,.25)
for f in [220,261.626,329.628,440]:add(tone(f,3.3,'bell'),26.5,.07)
stereo=np.stack((left,right),axis=1)
stereo=np.tanh(stereo*1.12)*.72
fade=np.minimum(np.arange(count)/(.06*SR),1)*np.minimum((count-1-np.arange(count))/(.9*SR),1)
stereo*=fade[:,None]
with wave.open(str(ASSETS/'original-score.wav'),'wb') as output:
    output.setnchannels(2);output.setsampwidth(2);output.setframerate(SR);output.writeframes((stereo*32767).astype('<i2').tobytes())
print(json.dumps({'original_images':33,'copied_assets':len(provenance),'soundtrack':'original, 30 seconds, stereo 48kHz, 120 BPM'}))
