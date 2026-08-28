"""Render new educational plots from explicit schematic coordinates, not image edits.

Requires Pillow (the same dependency as render-course-media.py). Originals are
never opened or changed. Coordinates represent schematic price, not market data.
"""
from pathlib import Path
import hashlib
import json
import math

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/course-reconstruction/module-02/editorial'
INK, MUTED, GREEN, RED, BLUE = '#183246', '#536675', '#007f70', '#c24e50', '#406ca3'
EDGE, BG = '#d6e0e5', '#f5f8fa'
FONT = Path('C:/Windows/Fonts/segoeui.ttf')
BOLD = Path('C:/Windows/Fonts/segoeuib.ttf')


def text(d, xy, value, width, size=26, color=INK, bold=False):
    f = ImageFont.truetype(str(BOLD if bold else FONT), size)
    cursor = xy[1]
    for paragraph in value.split('\n'):
        line = ''
        for word in paragraph.split():
            candidate = (line + ' ' + word).strip()
            if d.textlength(candidate, font=f) > width and line:
                d.text((xy[0], cursor), line, font=f, fill=color)
                cursor += math.ceil(size * 1.38)
                line = word
            else:
                line = candidate
        d.text((xy[0], cursor), line, font=f, fill=color)
        cursor += math.ceil(size * 1.38)
    return cursor


def canvas(title, subtitle, h=1040):
    im = Image.new('RGB', (1800, h), '#ffffff')
    d = ImageDraw.Draw(im)
    text(d, (60, 25), 'WEARETRADES ACADEMY  /  MÓDULO 2', 1680, 22, GREEN, True)
    text(d, (60, 72), title, 1680, 46, INK, True)
    text(d, (60, 143), subtitle, 1680, 25, MUTED)
    text(d, (60, h-63), 'Complemento editorial · Datos esquemáticos · Las líneas discontinuas ilustran escenarios, no pronósticos.', 1680, 23, MUTED)
    return im, d


def panel(d, box, title, note):
    x,y,w,h = box
    d.rounded_rectangle((x,y,x+w,y+h), radius=18, fill=BG, outline=EDGE, width=2)
    end = text(d, (x+24,y+22), title, w-48, 28, INK, True)
    if end > y+106: raise ValueError('Panel title overflow: '+title)
    end = text(d, (x+24,y+h-139), note, w-48, 23, MUTED)
    if end > y+h-12: raise ValueError('Panel note overflow: '+note)
    return (x+35,y+120,w-70,h-285)


def plot(d, box, values, projection=True, labels=()):
    x,y,w,h = box
    def at(i,v): return x+i*w/(len(values)-1), y+h-v*h/11
    for i in range(1,len(values)):
        a,b = at(i-1,values[i-1]), at(i,values[i])
        color = GREEN if values[i]>=values[i-1] else RED
        if projection and i==len(values)-1:
            for t in range(0,100,10):
                u,v = t/100,min(t+6,100)/100
                d.line((a[0]+u*(b[0]-a[0]),a[1]+u*(b[1]-a[1]),a[0]+v*(b[0]-a[0]),a[1]+v*(b[1]-a[1])),fill=color,width=5)
        else: d.line((*a,*b),fill=color,width=5)
    for i,label in labels:
        a=at(i,values[i]); d.ellipse((a[0]-6,a[1]-6,a[0]+6,a[1]+6),fill=INK)
        text(d,(a[0]-12,a[1]-36),label,90,22,INK,True)
    return at


def save(im, slug, figures, description):
    path=OUT/(slug+'.png')
    im.save(path,optimize=True)
    data=path.read_bytes()
    return dict(id=slug,src='/course-reconstruction/module-02/editorial/'+path.name,width=im.width,height=im.height,bytes=len(data),sha256=hashlib.sha256(data).hexdigest(),sourcePages=figures,description=description)


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    result=[]
    im,d=canvas('Tres tendencias: cambia la ubicación de la pausa','Primero el impulso; después identifica si aparece un retroceso sencillo o una consolidación.')
    cases=[('Tendencia 1',[1,4,2.7,7,5.8,10],'Dos pausas sencillas: después del primer y del segundo impulso.',[(1,'I1'),(3,'I2')]),('Tendencia 2',[1,4,2.7,7,5.5,6.6,5.7,10],'Consolidación después del segundo impulso. Sus oscilaciones no son nuevos impulsos principales.',[(1,'I1'),(3,'I2')]),('Tendencia 3',[1,4,2.8,3.8,2.9,7,5.6,10],'Consolidación después del primer impulso. No exige un POC ni demuestra volumen.',[(1,'I1'),(5,'I2')])]
    for i,(title,values,note,labels) in enumerate(cases):
        area=panel(d,(60+i*570,220,540,700),title,note)
        plot(d,area,values,labels=labels)
    result.append(save(im,'tres-tendencias',[11],'I1 e I2 son los finales de los dos primeros impulsos; las pausas complejas aparecen en lugares diferentes.'))

    im,d=canvas('Cinco patrones: compara sus mínimos','Números del curso original. Mira la secuencia; un nombre de figura no define una entrada.',1300)
    cases=[('1 · Mínimo más alto',[0,8,3,7,4.5,10],'El último mínimo queda por encima del anterior. Máximos internos descendentes.'),('2 · Perforación y recuperación',[0,8,3,7,2,10],'El último mínimo atraviesa el previo. La perforación sola no confirma recuperación.'),('3 · Bandera descendente',[0,9,5,8,4,7,3,10],'Máximos y mínimos descendentes dentro de la pausa.'),('4 · Bandera con mínimo más alto',[0,9,5,8,4,7,5,10],'El último mínimo queda más alto: 5 > 4 en las coordenadas esquemáticas.'),('5 · Nuevos máximos y pausas',[0,8,3,9,4.5,10],'Mínimos ascendentes con un nuevo máximo. Atención al contexto y al agotamiento.')]
    for i,(title,values,note) in enumerate(cases):
        row,col=divmod(i,3)
        area=panel(d,(60+col*570,220+row*485,540,455),title,note)
        plot(d,area,values)
    area=panel(d,(1200,705,540,455),'Clasificar no es operar','Los desenlaces dibujados no prueban probabilidades, volumen ni participación institucional.')
    text(d,(area[0],area[1]),'Contexto\nReferencia\nRecuperación\nInformación pendiente',440,27,GREEN,True)
    result.append(save(im,'cinco-patrones',[13,14,15,16,17,18],'El patrón 4 conserva su mínimo final más alto; el patrón 5 no se reduce a máximos iguales.'))

    im,d=canvas('Patrón 5: la ubicación cambia la lectura','El profesor distingue una variante temprana de la cautela ante una subida extendida.')
    for x,title,values,note in [(60,'Después del primer impulso',[1,6,3,6.6,4,9],'Puede estudiarse una nueva hipótesis si aparecen sus condiciones. No se garantiza éxito ni se ignora una invalidación.'),(920,'Después de una subida extendida',[0,3,2,6,4,8,5.5,8.6,6,9],'El profesor expresa cautela: avances con retrocesos profundos pueden parecerse al agotamiento. No es una señal automática.')]:
        area=panel(d,(x,220,820,700),title,note); plot(d,area,values)
    result.append(save(im,'patron-cinco-contexto',[18,19,25],'Dos ubicaciones para comparar; no se afirma éxito del segundo impulso ni fracaso obligatorio del primero.'))

    im,d=canvas('Fibonacci: dos escalas que no debes mezclar','El módulo 2 muestra una proyección. No la sustituyas por un retroceso convencional.')
    for x,title,projection,note in [(60,'Proyección del profesor · Módulo 2',True,'100 % en el origen A y 61,8 % en el final B del primer impulso. Los demás niveles quedan más arriba.'),(920,'Retroceso convencional · Comparación',False,'100 % en el origen A y 0 % en el extremo B. Los niveles intermedios miden la devolución de esa subida.')]:
        area=panel(d,(x,220,820,700),title,note); ax,ay,aw,ah=area
        for level in [0,23.6,38.2,50,61.8,100]:
            yy=ay+ah*level/100
            for xx in range(int(ax),int(ax+aw-140),18): d.line((xx,yy,xx+9,yy),fill=EDGE,width=2)
            text(d,(ax+aw-130,yy-14),str(level).replace('.',',')+' %',130,22,BLUE,True)
        by=ay+ah*.618 if projection else ay
        d.line((ax+60,ay+ah,ax+270,by),fill=GREEN,width=6)
        text(d,(ax+22,ay+ah-39),'A',60,25,INK,True)
        text(d,(ax+282,by-17),'B',60,25,INK,True)
    result.append(save(im,'fibonacci-dos-escalas',[20],'Proyección: B coincide con 61,8 %. Retroceso: B coincide con 0 %. No asigna patrones a porcentajes como regla universal.'))

    im,d=canvas('Agotamiento, ruptura y retesteo no son lo mismo','Cada observación aporta información distinta. Un aviso no confirma por sí solo una tendencia bajista.')
    cases=[('1 · Advertencia',[1,5,2.5,8,4,8.5,4.5,8.8],'Nuevos máximos con retrocesos profundos. El soporte todavía debe revisarse.'),('2 · Pérdida de soporte',[1,5,2.5,8,4,8.5,4.5,8.8,2],'Aquí aparece una pérdida del soporte marcado. No estaba confirmada en el paso anterior.'),('3 · Retesteo desde abajo',[8.5,4.5,8.8,2,3.7,1],'El rebote se queda debajo de la referencia de soporte perdida. Es distinto de recuperarla.')]
    for i,(title,values,note) in enumerate(cases):
        area=panel(d,(60+i*570,220,540,700),title,note)
        at=plot(d,area,values,projection=i==2)
        sy=at(0,4)[1]
        start=at(4,4)[0] if i<2 else area[0]
        for xx in range(int(start),int(area[0]+area[2]),18): d.line((xx,sy,xx+9,sy),fill=BLUE,width=2)
        text(d,(area[0],area[1]-35),'Línea azul: soporte de referencia',area[2],20,BLUE)
    result.append(save(im,'agotamiento-por-etapas',[25],'La última recuperación permanece bajo el soporte perdido; los tres dibujos son etapas esquemáticas, no precios reales.'))
    (OUT/'manifest.json').write_text(json.dumps({'module':2,'kind':'editorial-schematic','generator':'scripts/render-module-two-diagrams.py','assets':result},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Rendered',len(result),'new plots; uploaded originals unchanged.')


if __name__=='__main__': main()
