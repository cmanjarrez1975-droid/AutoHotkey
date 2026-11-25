"""New module 3 plots; reuses drawing helpers without changing module 2 assets.

Synthetic coordinates and OHLC are explicit. Does not open or edit user images.
Run with the same Pillow runtime used by render-module-two-diagrams.py.
"""
from pathlib import Path
import importlib.util
import sys
sys.dont_write_bytecode = True
import hashlib
import json
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/course-reconstruction/module-03/editorial'
spec = importlib.util.spec_from_file_location('module_two_drawing', ROOT/'scripts/render-module-two-diagrams.py')
drawing = importlib.util.module_from_spec(spec)
spec.loader.exec_module(drawing)
text, panel, plot = drawing.text, drawing.panel, drawing.plot
INK, MUTED, GREEN, RED, BLUE, EDGE = drawing.INK, drawing.MUTED, drawing.GREEN, drawing.RED, drawing.BLUE, drawing.EDGE


def canvas(title, subtitle):
    im=Image.new('RGB',(1800,1040),'white'); d=ImageDraw.Draw(im)
    text(d,(60,25),'WEARETRADES ACADEMY / MÓDULO 3',1680,22,GREEN,True)
    if text(d,(60,72),title,1680,44,INK,True)>140: raise ValueError('Title too long')
    if text(d,(60,143),subtitle,1680,25,MUTED)>211: raise ValueError('Subtitle too long')
    text(d,(60,977),'Complemento editorial · Datos ficticios · No es una señal de entrada ni demuestra participación institucional.',1680,23,MUTED)
    return im,d


def candles(d,box,closes):
    x,y,w,h=box; step=w/len(closes); rows=[]
    for i,(o,c) in enumerate(zip(closes,closes[1:])):
        high,low=max(o,c)+.22,min(o,c)-.22
        assert low<=min(o,c)<=max(o,c)<=high
        cx=x+(i+.75)*step
        py=lambda value:y+h-value*h/11
        color=GREEN if c>=o else RED
        d.line((cx,py(high),cx,py(low)),fill=color,width=3)
        d.rectangle((cx-step*.24,py(max(o,c)),cx+step*.24,py(min(o,c))),fill=color)
        rows.append(dict(open=o,high=high,low=low,close=c))
    return rows


def save(im,id,description,pages,**data):
    path=OUT/(id+'.png'); im.save(path,optimize=True); raw=path.read_bytes()
    return dict(id=id,src='/course-reconstruction/module-03/editorial/'+path.name,width=im.width,height=im.height,bytes=len(raw),sha256=hashlib.sha256(raw).hexdigest(),description=description,sourcePages=pages,**data)


def main():
    OUT.mkdir(parents=True,exist_ok=True); assets=[]
    im,d=canvas('Tres retrocesos: observa duración y profundidad','Secuencias completas para comparar. Los números de velas son aproximados, no una regla universal.')
    cases=[('Retroceso 1',[1,3,5,7,6,8],'Pausa breve: una vela en este ejemplo. Una pausa en curso todavía puede ampliarse.'),('Retroceso 2',[1,3,5,7,6,5,6,8],'Dos velas de pausa y dos de recuperación en este esquema. La clase admite variaciones.'),('Retroceso 3',[1,3,5,8,7,5.5,4,3,5,7,9],'Pausa más profunda y prolongada. Varias velas no garantizan que la subida continúe.')]
    series=[]
    for i,(title,closes,note) in enumerate(cases):
        box=panel(d,(60+i*570,220,540,700),title,note)
        series.append(candles(d,box,closes))
    assets.append(save(im,'tres-retrocesos','Tres ejemplos con OHLC ficticio: pausa breve, pausa de dos velas y corrección profunda. No son los tipos de tendencia del módulo 2.',[37],ohlc=series))

    im,d=canvas('Después del rango: dos ubicaciones posibles','El contacto exacto con la antigua resistencia no es obligatorio. Observa la recuperación posterior.')
    for i,(title,values,note) in enumerate([('Retorno a la referencia',[1,3,1.5,3,2,6,3,8],'El retroceso vuelve al nivel previo. El contacto por sí solo no confirma continuidad.'),('Pausa por encima del nivel',[1,3,1.5,3,2,6,4.5,8],'El mínimo queda por encima de la antigua resistencia. No se exige tocarla exactamente.')]):
        area=panel(d,(60+i*860,220,820,700),title,note); at=plot(d,area,values)
        sy=at(0,3)[1]
        for xx in range(int(area[0]),int(area[0]+area[2]),18):d.line((xx,sy,xx+9,sy),fill=BLUE,width=2)
        text(d,(area[0],area[1]-35),'Línea azul: resistencia anterior',area[2],22,BLUE)
    assets.append(save(im,'retrocesos-tras-rango','Comparación entre un retorno al nivel previo y una pausa que termina más arriba. La continuación discontinua es solo un escenario.',[42]))

    im,d=canvas('Microtendencia, W y V: no son el mismo dibujo','La caída local describe una estructura; W y V describen formas diferentes de recuperación.')
    cases=[('Microtendencia bajista',[9,6,8,4.8,7,3],'Máximos y mínimos descendentes en una escala menor. Todavía no se dibuja un giro.',False),('W: dos intentos de caída',[8,3,5.5,3.5,7],'Primer mínimo, rebote y segundo intento. Falta observar la recuperación de la referencia.',True),('V: caída y recuperación directa',[8,3,7],'Un solo fondo visible. No lo llames W si no aparece el segundo intento.',True)]
    for i,(title,values,note,future) in enumerate(cases):
        area=panel(d,(60+i*570,220,540,700),title,note); plot(d,area,values,projection=future)
    assets.append(save(im,'microtendencia-w-v','La microtendencia tiene extremos descendentes; la W necesita dos mínimos separados por un rebote; la V muestra un fondo único.',[45,46]))

    im,d=canvas('Fibonacci: calcula antes de interpretar la flecha','Comprobación de los anclajes rotulados en las prácticas aportadas. No se inventa una operación.')
    calculations=[]
    for i,(title,low,high,point,note) in enumerate([
        ('Práctica 2: tramo 108 → 125',108,125,115,'38,2 % = 118,506. Un punto en 115 corresponde al 58,82 %, no al 38,2 %. La mecha puede llegar aún más abajo.'),
        ('Práctica 3: referencias 71 y 100',71,100,68,'50 % = 85,5. Un punto en 68 queda por debajo de 71: equivale al 110,34 % del tramo, no al 50 %.')]):
        area=panel(d,(60+i*860,220,820,700),title,note); x,y,w,h=area
        minp=low-5; maxp=high+2
        py=lambda price:y+h-(price-minp)/(maxp-minp)*h
        levels=[]
        for ratio in [0,.236,.382,.5,.618,.764,1]:
            price=high-ratio*(high-low); yy=py(price)
            for xx in range(int(x),int(x+w-290),18): d.line((xx,yy,xx+9,yy),fill=EDGE,width=2)
            label=f'{ratio*100:g} % = {price:.3f}'.replace('.',',')
            text(d,(x+w-275,yy-13),label,275,22,BLUE,True)
            levels.append(dict(ratio=ratio,price=round(price,6)))
        px=x+155; yy=py(point)
        d.ellipse((px-8,yy-8,px+8,yy+8),fill=RED)
        text(d,(x+10,yy-45),f'Punto {point}',200,23,RED,True)
        calculations.append(dict(low=low,high=high,point=point,levels=levels,pointRatio=(high-point)/(high-low)))
    assets.append(save(im,'fibonacci-verificado','Con anclajes 108 y 125, 38,2 % está en 118,506. Con 71 y 100, 50 % está en 85,5; 68 queda fuera del tramo.',[],calculations=calculations))

    im,d=canvas('Una coincidencia de niveles no confirma una compra','Separa lo que el dibujo muestra de lo que todavía tendrías que observar.')
    items=[('1 · Contexto','¿Qué movimiento se está corrigiendo? Declara escala, impulso y referencias previas.'),('2 · Ubicación','¿Está cerca de un soporte o de un nivel calculado? La coincidencia solo ubica la observación.'),('3 · Secuencia','¿Qué mínimos, cuerpos, mechas y máximos se han formado realmente? No uses velas futuras.'),('4 · Condición pendiente','¿Qué referencia falta recuperar? Una vela aislada no demuestra continuidad ni identidad del comprador.'),('5 · Revisión','¿Qué dato haría cambiar tu lectura? Una tendencia mayor no impide una invalidación.')]
    for i,(title,note) in enumerate(items):
        yy=225+i*141
        d.rounded_rectangle((60,yy,1740,yy+117),radius=14,fill='#f5f8fa',outline=EDGE,width=2)
        text(d,(85,yy+20),title,460,27,INK,True)
        if text(d,(580,yy+18),note,1120,26,MUTED)>yy+110:raise ValueError('Note overflow')
    assets.append(save(im,'lectura-de-confluencias','Contexto, ubicación, secuencia, condición pendiente y revisión. No presupone absorción institucional ni genera señales de compra.',[43,44,45,46]))
    (OUT/'manifest.json').write_text(json.dumps(dict(module=3,kind='editorial-schematic',generator='scripts/render-module-three-diagrams.py',assets=assets),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Rendered',len(assets),'new module 3 diagrams. Module 2 assets untouched.')


if __name__=='__main__':main()
