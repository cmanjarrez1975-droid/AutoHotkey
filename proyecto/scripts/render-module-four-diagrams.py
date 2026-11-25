"""Render six new module 4 educational plots from explicit synthetic coordinates.

Uses existing Pillow drawing helpers. Never reads or edits uploaded originals.
"""
from pathlib import Path
import importlib.util
import sys
import hashlib
import json
from PIL import Image, ImageDraw

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/course-reconstruction/module-04/editorial'
spec = importlib.util.spec_from_file_location('module_three_drawing', ROOT/'scripts/render-module-three-diagrams.py')
drawing = importlib.util.module_from_spec(spec)
spec.loader.exec_module(drawing)
text, panel, plot, candles = drawing.text, drawing.panel, drawing.plot, drawing.candles
INK, MUTED, GREEN, RED, BLUE, EDGE = drawing.INK, drawing.MUTED, drawing.GREEN, drawing.RED, drawing.BLUE, drawing.EDGE


def canvas(title, subtitle, height=1040):
    im = Image.new('RGB', (1800, height), 'white')
    d = ImageDraw.Draw(im)
    text(d, (60, 25), 'WEARETRADES ACADEMY / MÓDULO 4', 1680, 22, RED, True)
    if text(d, (60, 72), title, 1680, 43, INK, True) > 140:
        raise ValueError('Title overflow: '+title)
    if text(d, (60, 143), subtitle, 1680, 25, MUTED) > 211:
        raise ValueError('Subtitle overflow')
    text(d, (60, height-63), 'Complemento editorial · Datos ficticios · Tramos discontinuos: escenarios, no pronósticos ni señales.', 1680, 23, MUTED)
    return im, d


def horizontal(d, area, at, value):
    y = at(0, value)[1]
    for x in range(int(area[0]), int(area[0]+area[2]), 18):
        d.line((x, y, x+9, y), fill=BLUE, width=2)


def save(im, id, description, pages, **data):
    path = OUT/(id+'.png')
    im.save(path, optimize=True)
    raw = path.read_bytes()
    return dict(id=id, src='/course-reconstruction/module-04/editorial/'+path.name,
                width=im.width, height=im.height, bytes=len(raw), sha256=hashlib.sha256(raw).hexdigest(),
                description=description, sourcePages=pages, **data)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    assets = []
    im, d = canvas('Cuatro tendencias: ubica las pausas', 'I1 e I2 son los finales de los dos primeros impulsos principales, no cada oscilación interna.', 1550)
    trends = [
        ('1 · Dos pausas sencillas', [10, 7, 8, 4, 5, 1], 'Después de I1: sencilla. Después de I2: sencilla. La pausa no exige tocar el soporte roto.', [(1, 'I1'), (3, 'I2')]),
        ('2 · Compleja después de I2', [10, 7, 8, 4, 6, 4.8, 5.8, 1], 'Después de I1: sencilla. Después de I2: pausa con varias oscilaciones.', [(1, 'I1'), (3, 'I2')]),
        ('3 · Compleja después de I1', [10, 7, 8.5, 7.4, 8.3, 4, 5, 1], 'Después de I1: pausa compleja. Después de I2: sencilla. No necesita un POC demostrado.', [(1, 'I1'), (5, 'I2')]),
        ('4 · Dos pausas complejas', [10, 7, 8.5, 7.4, 8.3, 4, 6, 4.8, 5.8, 1], 'Hay una estructura de pausa después de cada impulso. No confundir tendencia 4 con patrón 4.', [(1, 'I1'), (5, 'I2')]),
    ]
    for i, (title, values, note, labels) in enumerate(trends):
        row, col = divmod(i, 2)
        area = panel(d, (60+col*860, 220+row*625, 820, 585), title, note)
        plot(d, area, values, labels=labels)
    assets.append(save(im, 'cuatro-tendencias', 'Cuatro secuencias del manual según la pausa después de I1 e I2: sencilla/sencilla, sencilla/compleja, compleja/sencilla y compleja/compleja.', [58, 59], series=[v for _, v, _, _ in trends]))

    im, d = canvas('Tres retrocesos: el rebote corrige una caída', 'Compara duración, profundidad y ubicación. No clasifiques una pausa completa con su primera vela.')
    cases = [
        ('Tipo 1 · Pausa breve', [10, 8, 6, 4, 5, 3, 2], 'Una vela de recuperación en este ejemplo. Su primera aparición no garantiza que sea toda la pausa.'),
        ('Tipo 2 · Recuperación intermedia', [10, 8, 6, 4, 5, 6, 4, 2], 'Dos velas de recuperación y dos de caída. Es un prototipo, no una cantidad obligatoria.'),
        ('Tipo 3 · Recuperación profunda', [10, 8, 6, 4, 5, 6.5, 8, 5, 2], 'Devuelve una parte mayor del descenso. Profundidad y número de velas son medidas distintas.'),
    ]
    ohlc = []
    for i, (title, closes, note) in enumerate(cases):
        area = panel(d, (60+i*570, 220, 540, 700), title, note)
        ohlc.append(candles(d, area, closes))
    assets.append(save(im, 'tres-retrocesos', 'Tres secuencias completas de velas ficticias con la misma escala. Las velas posteriores sirven para comparar retrospectivamente, no para predecir.', [60, 61], ohlc=ohlc))

    im, d = canvas('Después del rango: el retorno no exige un toque', 'Línea azul: antiguo suelo. Distingue su pérdida, el rebote posterior y lo que todavía falta observar.')
    range_cases = [
        ('Pausa por debajo del suelo', [9, 7, 9, 7, 9, 3, 5, 1], 'El rebote termina por debajo de la referencia. La caída discontinua es solo un escenario.'),
        ('Retorno hasta la referencia', [9, 7, 9, 7, 9, 3, 7, 1], 'El rebote vuelve al antiguo suelo. El contacto no demuestra por sí solo continuidad bajista.'),
    ]
    for i, (title, values, note) in enumerate(range_cases):
        area = panel(d, (60+i*860, 220, 820, 700), title, note)
        at = plot(d, area, values)
        horizontal(d, area, at, 7)
    assets.append(save(im, 'retrocesos-tras-rango', 'Dos ubicaciones admitidas por la fuente: pausa por debajo del suelo roto o retorno hasta él. La recuperación del rango exigiría revisar el escenario.', [58, 65]))

    im, d = canvas('Cinco continuaciones: conserva la geometría', 'Numeración de la página 68. Compara el mínimo intermedio y el segundo máximo de cada pausa.', 1300)
    patterns = [
        ('1 · Máximos parecidos', [10, 4, 7, 5, 7, 2], 'Dos máximos a la misma altura en el esquema. Mínimo intermedio por encima del inicial.'),
        ('2 · Segundo máximo superior', [10, 4, 7, 5, 8, 2], 'El segundo máximo supera al primero. Esa superación sola no demuestra una falsa ruptura.'),
        ('3 · Expansión por ambos lados', [10, 4, 7, 3, 8, 2], 'El mínimo intermedio baja y el segundo máximo sube respecto a los extremos anteriores.'),
        ('4 · Compresión', [10, 4, 7, 5, 6, 2], 'Segundo máximo más bajo y mínimo intermedio más alto. Las referencias convergen.'),
        ('5 · Mínimo intermedio inferior', [10, 4, 7, 3, 6, 1], 'Segundo máximo más bajo y mínimo intermedio inferior. No es un triángulo de suelo fijo.'),
    ]
    for i, (title, values, note) in enumerate(patterns):
        row, col = divmod(i, 3)
        area = panel(d, (60+col*570, 220+row*485, 540, 455), title, note)
        plot(d, area, values)
    area = panel(d, (1200, 705, 540, 455), 'Leer antes de etiquetar', 'Son esquemas del curso, no un catálogo de entradas. El desenlace no es conocido al empezar la pausa.')
    text(d, (area[0], area[1]), 'Mínimo inicial\nPrimer máximo\nMínimo intermedio\nSegundo máximo', 440, 26, BLUE, True)
    assets.append(save(im, 'cinco-continuaciones', 'Los patrones 3, 4 y 5 se distinguen por expansión, compresión y mínimo intermedio inferior. No se sustituyen por nombres genéricos de figuras.', [68], series=[v for _, v, _ in patterns]))

    im, d = canvas('Mínimo más alto: ¿se recuperó el máximo?', 'Ejemplo de comprensión inspirado en la página 69. Las dos imágenes se detienen en estados distintos.')
    states = [
        ('A · Condición pendiente', [95, 90, 94, 87, 94, 89, 93], '89 > 87: mínimo más alto. Pero 93 < 94: el máximo de referencia todavía no se ha superado.'),
        ('B · Referencia superada', [95, 90, 94, 87, 94, 89, 95], '95 > 94: se ha recuperado ese máximo local. No garantiza una tendencia alcista duradera.'),
    ]
    for i, (title, prices, note) in enumerate(states):
        area = panel(d, (60+i*860, 220, 820, 700), title, note)
        at = plot(d, area, [p-86 for p in prices], projection=False)
        horizontal(d, area, at, 8)
        text(d, (area[0], area[1]-30), 'Línea azul: referencia 94', area[2], 22, BLUE)
    assets.append(save(im, 'agotamiento-y-referencia', 'Comparación del mismo comienzo: el estado A termina en 93 y no supera 94; el B termina en 95 y sí lo supera. Son escenarios separados, no pasos obligatorios.', [69], states=[p for _, p, _ in states]))

    im, d = canvas('Fibonacci: el mismo porcentaje, otro precio', 'Caída de 9 a 4. La práctica aportada mezcla el precio del panel izquierdo con los rótulos del derecho.')
    calculations = []
    for i, ascending in enumerate([True, False]):
        title = 'Rebote: 0 % abajo / 100 % arriba' if ascending else 'Escala invertida: 0 % arriba'
        note = '38,2 % desde 4 = 5,91. Esta orientación mide cuánto se recupera de la caída de 9 a 4.' if ascending else '38,2 % desde 9 = 7,09. El precio 5,91 equivale aquí al 61,8 %, no al 38,2 %.'
        area = panel(d, (60+i*860, 220, 820, 700), title, note)
        x, y, w, h = area
        levels = []
        for ratio in [0, .236, .382, .5, .618, .764, 1]:
            price = 4+ratio*5 if ascending else 9-ratio*5
            yy = y+h-(price-4)/5*h
            color = RED if ratio == .382 else EDGE
            for xx in range(int(x), int(x+w-300), 18):
                d.line((xx, yy, xx+9, yy), fill=color, width=3 if ratio == .382 else 2)
            label = f'{ratio*100:g} % = {price:.3f}'.replace('.', ',')
            text(d, (x+w-280, yy-15), label, 280, 23, RED if ratio == .382 else BLUE, True)
            levels.append(dict(ratio=ratio, price=round(price, 6)))
        calculations.append(dict(low=4, high=9, ascending=ascending, levels=levels))
    assets.append(save(im, 'fibonacci-verificado', 'Con extremos 9 y 4, el 38,2 % de rebote es 5,91; con los rótulos invertidos es 7,09. Declara siempre el origen de la escala.', [], calculations=calculations))
    (OUT/'manifest.json').write_text(json.dumps(dict(module=4, kind='editorial-schematic', generator='scripts/render-module-four-diagrams.py', assets=assets), ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print('Rendered', len(assets), 'module 4 diagrams; originals unchanged.')


if __name__ == '__main__':
    main()
