"""Reproducible educational plots. Synthetic data, never edits source imagery."""
from pathlib import Path
import importlib.util
import hashlib
import json
import sys
from PIL import Image, ImageDraw

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT/'public/course-reconstruction/module-07/editorial'
spec = importlib.util.spec_from_file_location('drawing', ROOT/'scripts/render-module-five-diagrams.py')
drawing = importlib.util.module_from_spec(spec)
spec.loader.exec_module(drawing)
text, panel, candle, dashed = drawing.text, drawing.panel, drawing.candle, drawing.dashed
INK, MUTED, GREEN, RED, BLUE, EDGE = drawing.INK, drawing.MUTED, drawing.GREEN, drawing.RED, drawing.BLUE, drawing.EDGE


def canvas(title, subtitle):
    im = Image.new('RGB', (1800, 1100), 'white')
    d = ImageDraw.Draw(im)
    text(d, (60, 25), 'WEARETRADES ACADEMY / MÓDULO 7 · VELAS PROFESIONALES', 1680, 22, GREEN, True)
    assert text(d, (60, 72), title, 1680, 43, INK, True) < 140
    assert text(d, (60, 143), subtitle, 1680, 25, MUTED) < 215
    text(d, (60, 1035), 'Complemento editorial · Datos ficticios · Formas y acontecimientos, no señales ni probabilidades verificadas.', 1680, 23, MUTED)
    return im, d


def save(im, id, description, **data):
    path = OUT/(id+'.png')
    im.save(path, optimize=True)
    raw = path.read_bytes()
    return dict(id=id, src='/course-reconstruction/module-07/editorial/'+path.name,
                width=im.width, height=im.height, bytes=len(raw), sha256=hashlib.sha256(raw).hexdigest(),
                description=description, **data)


def series(d, area, values, low, high, levels=()):
    x,y,w,h = area
    py = lambda p:y+h-(p-low)/(high-low)*h
    for value, label, color in levels:
        dashed(d, x, x+w, py(value), color)
        text(d, (x+8, py(value)+7), label, w-16, 22, color, True)
    pts = [(x+30+i*(w-60)/(len(values)-1), py(p)) for i,p in enumerate(values)]
    d.line(pts, fill=INK, width=5)
    for (xx,yy),value in zip(pts,values):
        d.ellipse((xx-6,yy-6,xx+6,yy+6),fill=INK)
        text(d,(xx-24,yy-38),f'{value:g}'.replace('.',','),110,23,INK,True)
    return pts


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    assets=[]
    im,d=canvas('Una lectura vendedora no exige una vela roja', 'Cuatro formas del sistema, ilustradas en verde para separar color y contexto. No son umbrales de clasificación.')
    rows=[dict(open=100,high=105,low=99,close=104.8),dict(open=100,high=105,low=99,close=103),dict(open=100,high=105,low=99,close=100.5),dict(open=104,high=105,low=99,close=104.5)]
    titles=['Tipo 1 · Cierre alto','Tipo 2 · Mecha arriba','Tipo 3 · Cuerpo abajo','Tipo 4 · Martillo arriba']
    notes=['Cuerpo amplio y poca mecha superior. En resistencia: estudiar la respuesta siguiente.',
           'Mecha superior visible. Hubo un máximo por encima del cierre; el giro aún es una hipótesis.',
           'Cuerpo pequeño y mecha superior larga. La forma sola no confirma una venta.',
           'Mecha inferior larga en una zona alta. En soporte después de caer, el contexto sería distinto.']
    for i,row in enumerate(rows):
        x,y,w,h=panel(d,(60+i*425,230,405,730),titles[i],notes[i])
        py=lambda p:y+280-(p-98)/8*280
        candle(d,x+w/2,py,row,80)
        assert text(d,(x,y+320),f"O {row['open']:g} · H {row['high']:g}\nL {row['low']:g} · C {row['close']:g}".replace('.',','),w,25,INK) < y+h+25
    assets.append(save(im,'cuatro-formas','Cuatro velas ficticias con el mismo máximo 105 y mínimo 99, pero cuerpos y mechas distintos. La forma tipo 4 solo se estudia como alerta vendedora en el contexto superior descrito.',ohlc=rows))

    im,d=canvas('La base está entre los dos máximos', 'Primera, segunda y tercera variante según Sistema de lecturas. Cada dibujo incluye una ruptura posterior ficticia.')
    seqs=[[102,110,106,110,105.8],[102,110,106,111,105.8],[102,110,106,109,105.8]]
    for i,values in enumerate(seqs):
        area=panel(d,(60+i*570,230,540,730),['1 · Máximos iguales','2 · Segundo más alto','3 · Segundo más bajo'][i],
                   'Base B = 106. El segundo máximo define la variante; solo el tramo posterior hasta 105,8 atraviesa B.')
        series(d,area,values,100,114,[(106,'B = 106 · base',BLUE)])
    assets.append(save(im,'variantes-m','Tres variantes M con base 106. Los segundos máximos son 110, 111 y 109. La caída final a 105,8 es un acontecimiento posterior, no una consecuencia garantizada.',sequences=seqs,base=106))

    im,d=canvas('La ruptura local no espera al cierre M15', 'Vela de referencia cerrada a las 10:15. Ejemplo de observaciones durante la siguiente M15, que cierra a las 10:30.')
    events=[dict(time='10:18',minute=618,price=110),dict(time='10:20',minute=620,price=106),dict(time='10:22',minute=622,price=109),dict(time='10:23',minute=623,price=106.2),dict(time='10:24',minute=624,price=105.8)]
    area=panel(d,(60,230,820,730),'Secuencia conocida por momentos', 'A las 10:23, 106,2 no rompe 106. Solo al añadir la observación 10:24 aparece el cruce hasta 105,8.')
    # Time-proportional horizontal axis; lines are schematic connections between observations.
    x,y,w,h=area; py=lambda p:y+h-(p-104)/8*h
    dashed(d,x,x+w,py(106),BLUE)
    text(d,(x+10,py(106)+38),'Base = 106',250,24,BLUE,True)
    pts=[(x+45+(e['minute']-618)/6*(w-110),py(e['price'])) for e in events]
    d.line(pts,fill=INK,width=5)
    for e,(xx,yy) in zip(events,pts):
        d.ellipse((xx-6,yy-6,xx+6,yy+6),fill=INK)
        text(d,(xx-25,yy-40),str(e['price']).replace('.',','),100,22,INK,True)
        text(d,(xx-28,y+h-34),e['time'],95,20,MUTED)
    x,y,w,h=panel(d,(920,230,820,730),'Qué puedes afirmar a las 10:24', 'Que M15 termine roja o verde a las 10:30 no puede usarse como información disponible a las 10:24.')
    assert text(d,(x+15,y+10),'YA OBSERVADO\nVela anterior cerrada a las 10:15.\nM local: 110 → 106 → 109.\nRuptura de 106 a las 10:24.',w-30,29,GREEN,True)<y+220
    assert text(d,(x+15,y+240),'TODAVÍA DESCONOCIDO\nCierre definitivo de las 10:30.\nResultado posterior de la hipótesis.',w-30,29,RED,True)<y+h+15
    assets.append(save(im,'tiempo-y-base','Observaciones fechadas: a las 10:23 la base 106 permanece sin romper; a las 10:24 se atraviesa. El cierre M15 de las 10:30 sigue siendo futuro.',events=events,base=106,referenceCloseMinute=615,activeCloseMinute=630))

    im,d=canvas('Romper la base no es romper el mínimo anterior', 'Distingue la estructura menor del recorrido de la mecha. Son dos referencias y dos acontecimientos.')
    row=dict(open=110,high=111,low=100,close=104)
    x,y,w,h=panel(d,(60,230,820,730),'Vela anterior terminada', 'La recuperación desde 100 deja mecha inferior hasta 104. No prueba por sí misma un giro alcista ni quién operó.')
    py=lambda p:y+h-(p-98)/15*h
    d.rectangle((x,py(104),x+240,py(100)),fill='#e0edf5',outline=BLUE,width=2)
    candle(d,x+120,py,row,100)
    text(d,(x+285,y+20),'O 110 · H 111\nL 100 · C 104\n\nMecha inferior:\n100–104',w-290,30,INK,True)
    values=[107,103,106,102.8,99.8]
    area=panel(d,(920,230,820,730),'Secuencia posterior ficticia', '102,8 rompe la base 103, pero sigue sobre 100. Más tarde, 99,8 también atraviesa el mínimo anterior 100.')
    series(d,area,values,97,110,[(103,'Base local = 103',BLUE),(100,'Mínimo anterior = 100',RED)])
    assets.append(save(im,'mecha-y-minimo','OHLC anterior 110/111/100/104. La secuencia posterior rompe primero 103 y solo después 100. No anticipes el segundo evento al observar el primero.',ohlc=row,sequence=values,localBase=103,priorLow=100))

    im,d=canvas('El centro del rango no calcula el POC', 'El POC de volumen requiere datos negociados por precio durante un intervalo definido.')
    x,y,w,h=panel(d,(60,230,820,730),'Geometría: rango 100–106', 'El punto medio usa solamente los límites. Sin el perfil de volumen no sabes cuál es su POC.')
    py=lambda p:y+h-(p-99)/8*h
    d.rectangle((x+45,py(106),x+240,py(100)),fill='#e0edf5',outline=BLUE,width=3)
    for v,label in [(106,'Techo 106'),(103,'Centro 103'),(100,'Suelo 100')]:
        dashed(d,x+45,x+300,py(v),BLUE)
        text(d,(x+320,py(v)-17),label,350,27,INK,True)
    profile=[dict(price=100,volume=10),dict(price=102,volume=80),dict(price=104,volume=30),dict(price=106,volume=20)]
    x,y,w,h=panel(d,(920,230,820,730),'Volumen por precio: POC 102', 'El mayor volumen está en 102: 80 contratos. No coincide con el centro geométrico 103. Datos ficticios agregados.')
    text(d,(x+170,y-10),'CONTRATOS POR NIVEL',500,23,MUTED,True)
    for i,r in enumerate(reversed(profile)):
        yy=y+60+i*90; color=GREEN if r['volume']==80 else BLUE
        text(d,(x,yy),str(r['price']),90,28,INK,True)
        d.rectangle((x+110,yy+5,x+110+r['volume']/80*420,yy+45),fill=color)
        text(d,(x+130+r['volume']/80*420,yy),str(r['volume']),100,28,color,True)
    assets.append(save(im,'rango-y-poc','Rango 100–106 con centro 103 y perfil ficticio cuyo POC es 102 con 80 contratos. POC y punto medio son cálculos distintos.',range=[100,106],midpoint=103,profile=profile,poc=102))
    (OUT/'manifest.json').write_text(json.dumps(dict(module=7,kind='editorial-schematic',generator='scripts/render-module-seven-diagrams.py',assets=assets),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Rendered',len(assets),'new plots.')


if __name__=='__main__':
    main()
