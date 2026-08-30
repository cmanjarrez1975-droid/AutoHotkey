"""Reproducible teaching plots with synthetic data. Never edits uploaded images."""
from pathlib import Path
import importlib.util
import sys
import json
import hashlib
from PIL import Image, ImageDraw

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/course-reconstruction/module-06/editorial'
spec = importlib.util.spec_from_file_location('drawing_five', ROOT/'scripts/render-module-five-diagrams.py')
drawing = importlib.util.module_from_spec(spec)
spec.loader.exec_module(drawing)
text, panel, candle, dashed = drawing.text, drawing.panel, drawing.candle, drawing.dashed
INK, MUTED, GREEN, RED, BLUE, EDGE = drawing.INK, drawing.MUTED, drawing.GREEN, drawing.RED, drawing.BLUE, drawing.EDGE


def canvas(title, subtitle):
    im = Image.new('RGB', (1800, 1100), 'white')
    d = ImageDraw.Draw(im)
    text(d, (60, 25), 'WEARETRADES ACADEMY / MÓDULO 6 · ORDER BLOCK', 1680, 22, GREEN, True)
    assert text(d, (60, 72), title, 1680, 43, INK, True) < 140
    assert text(d, (60, 143), subtitle, 1680, 25, MUTED) < 215
    text(d, (60, 1035), 'Complemento editorial · Datos ficticios · Visitar una zona no demuestra una ejecución ni una probabilidad.', 1680, 23, MUTED)
    return im, d


def save(im, id, description, **data):
    path = OUT/(id+'.png')
    im.save(path, optimize=True)
    raw = path.read_bytes()
    return dict(id=id, src='/course-reconstruction/module-06/editorial/'+path.name,
                width=im.width, height=im.height, bytes=len(raw), sha256=hashlib.sha256(raw).hexdigest(),
                description=description, **data)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    assets = []
    im, d = canvas('El cuerpo delimita; la mecha sigue existiendo', 'Convención de estos ejercicios: zona entre apertura y cierre. La respuesta posterior permite identificarla.')
    rows = [dict(open=104, high=105, low=99, close=101), dict(open=108, high=112, low=107, close=110)]
    for i, row in enumerate(rows):
        x,y,w,h = panel(d, (60+i*860,230,820,730), ['Origen de bloque comprador', 'Origen de bloque vendedor'][i],
                       'La zona no incluye las mechas en esta convención. El color de la vela de origen no es el sentido del empuje posterior.')
        low, high = row['low']-1, row['high']+1
        py = lambda p: y+h-(p-low)/(high-low)*h
        a,b = sorted([row['open'], row['close']])
        d.rectangle((x,py(b),x+225,py(a)), fill='#dcebea', outline=GREEN, width=2)
        candle(d,x+110,py,row,85)
        for j, (label,value) in enumerate([('Apertura',row['open']),('Cierre',row['close']),('Máximo',row['high']),('Mínimo',row['low'])]):
            text(d,(x+280,y+j*60),f'{label}: {value}',430,27,INK,True)
        text(d,(x+280,y+285),f'Zona: [{a}; {b}]\nNo es el rango total de la vela.',430,27,GREEN,True)
    assets.append(save(im,'cuerpo-y-mechas','Dos orígenes ficticios: cuerpo comprador [101;104] con mínimo 99 y cuerpo vendedor [108;110] con máximo 112.',ohlc=rows))

    im,d = canvas('La visita queda registrada aunque el precio se aleje', 'Zona [101;104] ya identificada y abandonada. Barras posteriores con observación continua, sin saltos.')
    ranges = [[104.5,107],[103.5,106],[105,108]]
    for i,(lo,hi) in enumerate(ranges):
        x,y,w,h = panel(d,(60+i*570,230,540,730),['A · Todavía sin visita','B · Primera visita','C · Sigue visitada'][i],
                       ['El mínimo 104,50 queda por encima del borde 104. No toca la zona.',
                        'El mínimo 103,50 entra en la zona. Cerrar en 105,50 no borra ese acontecimiento.',
                        'El mínimo 105 queda fuera, pero la visita anterior no desaparece. No se reactiva el bloque.'][i])
        py = lambda p: y+h-(p-100)/9*h
        d.rectangle((x,py(104),x+w,py(101)),fill='#e0edf5',outline=BLUE,width=2)
        cx=x+w*.7
        d.line((cx,py(lo),cx,py(hi)),fill=INK,width=6)
        for value in [lo,hi]:
            d.line((cx-20,py(value),cx+20,py(value)),fill=INK,width=4)
            text(d,(x+10,py(value)-18),f'{value:g}'.replace('.',','),150,26,INK,True)
        text(d,(x+12,py(102)-15),'Zona 101–104',260,25,BLUE,True)
        if i==1:
            d.ellipse((cx-8,py(105.5)-8,cx+8,py(105.5)+8),fill=GREEN)
    assets.append(save(im,'visita-persistente','A no toca; B visita por su mínimo; C se aleja sin borrar la visita registrada. Líneas negras: rango de cada barra, punto verde: cierre de B.',zone=[101,104],ranges=ranges,closeB=105.5,states=['sin-visita','visitada','visitada']))

    im,d = canvas('Un retorno debe llegar a la zona que señalas', 'Una reacción por encima de un rectángulo no es una visita a ese rectángulo. No cambies sus límites después.')
    for i,minimum in enumerate([5,3.5]):
        x,y,w,h=panel(d,(60+i*860,230,820,730),['Retorno a 5 · No visita','Retorno a 3,50 · Sí visita'][i],
                     ['El bloque está entre 2,50 y 4. El mínimo 5 no entra: hay un punto de distancia hasta el borde superior.',
                      'El retorno llega a 3,50 y entra en [2,50;4]. Se registra contacto, no compra ejecutada ni órdenes institucionales agotadas.'][i])
        py=lambda p:y+h-(p-2)/7*h
        d.rectangle((x,py(4),x+w,py(2.5)),fill='#e0edf5',outline=BLUE,width=2)
        pts=[(x+50,py(8)),(x+w*.62,py(minimum)),(x+w-30,py(7))]
        d.line(pts,fill=INK,width=5)
        cx,cy=pts[1]; d.ellipse((cx-9,cy-9,cx+9,cy+9),fill=GREEN if i else RED)
        text(d,(x+10,py(3)-5),'Zona fija: 2,50–4',400,25,BLUE,True)
        text(d,(x+260,y+5),f'Mínimo: {minimum:g}'.replace('.',','),350,27,INK,True)
    assets.append(save(im,'retorno-y-contacto','Comparación numérica: el retorno a 5 no visita [2,50;4]; el retorno a 3,50 sí. La geometría no demuestra ejecuciones.',zone=[2.5,4],returnMinima=[5,3.5]))

    im,d = canvas('Mínimo más alto y ruptura local: pasos distintos', 'La referencia 2,50 es el máximo entre los dos valles de esta W local; la referencia anterior 3,20 es otra.')
    series=[[3.2,1,2.5,2,2.4],[3.2,1,2.5,2,2.8]]
    for i,values in enumerate(series):
        x,y,w,h=panel(d,(60+i*860,230,820,730),['1 · Reacción todavía bajo 2,50','2 · Superación local de 2,50'][i],
                     ['El segundo valle está en 2, por encima de 1. La reacción hasta 2,40 aún no atraviesa el máximo intermedio.',
                      'El movimiento observado llega a 2,80 y supera 2,50. Todavía no supera la referencia anterior 3,20. Define la escala de tu afirmación.'][i])
        py=lambda p:y+h-(p-.5)/3.2*h
        for level,color in [(2.5,BLUE),(3.2,MUTED)]:
            dashed(d,x,x+w,py(level),color)
            text(d,(x+10,py(level)-36),str(level).replace('.',','),200,23,color,True)
        pts=[(x+60+j*(w-120)/4,py(v)) for j,v in enumerate(values)]
        d.line(pts,fill=INK,width=5)
        for j in [1,3,4]:
            cx,cy=pts[j];d.ellipse((cx-7,cy-7,cx+7,cy+7),fill=GREEN)
        text(d,(x+w*.60,py(2)+15),'Segundo valle: 2',280,23,GREEN,True)
    assets.append(save(im,'reaccion-y-ruptura','Una W local reacciona a 2,40 sin romper 2,50; en el segundo estado alcanza 2,80 pero no rompe la referencia mayor 3,20.',series=series,localReference=2.5,priorReference=3.2))

    im,d=canvas('Ampliar el stop exige recalcular la cantidad', 'Compra ficticia 103 · Destino 108 · Presupuesto teórico 20 · Valor por punto y unidad = 1 · Sin costes.')
    cases=[dict(entry=103,stop=101,target=108,risk=2,reward=5,ratio=2.5,quantity=10),dict(entry=103,stop=99,target=108,risk=4,reward=5,ratio=1.25,quantity=5)]
    for i,c in enumerate(cases):
        x,y,w,h=panel(d,(60+i*860,230,820,730),['Stop A · Distancia 2','Stop B · Distancia 4'][i],
                     ['20 / 2 = 10 unidades. Riesgo teórico total: 20. Ningún stop garantiza el precio de salida.',
                      '20 / 4 = 5 unidades. Conservar 10 unidades elevaría el riesgo teórico a 40. Un stop más amplio no demuestra mayor acierto.'][i])
        py=lambda p:y+h-(p-98)/11*h
        for label,value,color in [('Destino',108,GREEN),('Entrada',103,BLUE),('Stop',c['stop'],RED)]:
            dashed(d,x,x+280,py(value),color)
            text(d,(x+5,py(value)-35),f'{label}: {value}',275,23,color,True)
        text(d,(x+345,y+25),f"Riesgo por unidad: {c['risk']}\nRecorrido: 5\nRelación: {str(c['ratio']).replace('.',',')}R\nCantidad: {c['quantity']}\nRiesgo total: 20",380,29,INK,True)
    assets.append(save(im,'stop-y-cantidad','Mismo destino 108 y entrada 103. Stop 101: 2,5R y 10 unidades; stop 99: 1,25R y 5 unidades para mantener riesgo teórico 20.',budget=20,pointValue=1,calculations=cases))

    im,d=canvas('El cierre H1 de las 12:00 no existe a las 11:36', 'El marco menor puede observarse antes de cerrar el mayor. No uses información futura para justificar la decisión.')
    x,y,w,h=panel(d,(60,230,1680,730),'Línea temporal de disponibilidad',
                 'A las 11:36 se conocen los datos hasta ese momento y el estado provisional de H1. El cierre definitivo de las 12:00 todavía no está disponible.')
    x0,x1=x+90,x+w-100; decision=x0+(x1-x0)*.6; cy=y+160
    d.line((x0,cy,x1,cy),fill=EDGE,width=8)
    d.line((x0,cy,decision,cy),fill=GREEN,width=8)
    for xx,label,color in [(x0,'11:00 · Abre H1',INK),(decision,'11:36 · Decisión M3',GREEN),(x1,'12:00 · Cierra H1',RED)]:
        d.line((xx,cy-20,xx,cy+20),fill=color,width=4)
        text(d,(xx-85,cy+45),label,290,27,color,True)
    text(d,(x+90,y+20),'INFORMACIÓN CONOCIDA',700,30,GREEN,True)
    text(d,(decision+100,y+20),'TODAVÍA FUTURO',530,30,RED,True)
    text(d,(x+90,cy+140),'La barra H1 sigue formándose. Su cierre final no puede retrotraerse a una decisión anterior.',w-180,31,INK)
    assets.append(save(im,'tiempo-disponible','H1 abre a las 11:00, la decisión M3 es a las 11:36 y el cierre H1 solo estará disponible a las 12:00.',openMinute=660,decisionMinute=696,closeMinute=720))
    (OUT/'manifest.json').write_text(json.dumps(dict(module=6,kind='editorial-schematic',generator='scripts/render-module-six-diagrams.py',assets=assets),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Rendered',len(assets),'new plots; originals unchanged.')


if __name__=='__main__':
    main()
