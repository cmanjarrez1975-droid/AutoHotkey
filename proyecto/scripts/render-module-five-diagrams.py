"""Six educational plots with explicit synthetic data; never edits source images.

Uses the existing Pillow plotting helpers. Run in the project's Python runtime.
"""
from pathlib import Path
import importlib.util
import sys
import json
import hashlib
from decimal import Decimal as D
from PIL import Image, ImageDraw

sys.dont_write_bytecode = True
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/course-reconstruction/module-05/editorial'
spec = importlib.util.spec_from_file_location('module_two_drawing', ROOT/'scripts/render-module-two-diagrams.py')
drawing = importlib.util.module_from_spec(spec)
spec.loader.exec_module(drawing)
text, panel, plot = drawing.text, drawing.panel, drawing.plot
INK, MUTED, GREEN, RED, BLUE, EDGE = drawing.INK, drawing.MUTED, drawing.GREEN, drawing.RED, drawing.BLUE, drawing.EDGE


def canvas(title, subtitle, height=1100):
    im = Image.new('RGB', (1800, height), 'white')
    d = ImageDraw.Draw(im)
    text(d, (60, 25), 'WEARETRADES ACADEMY / MÓDULO 5', 1680, 22, GREEN, True)
    assert text(d, (60, 72), title, 1680, 43, INK, True) < 140
    assert text(d, (60, 143), subtitle, 1680, 25, MUTED) < 215
    text(d, (60, height-65), 'Complemento editorial · Datos ficticios · No representa ejecuciones reales ni demuestra probabilidades.', 1680, 23, MUTED)
    return im, d


def dashed(d, x1, x2, y, color=BLUE):
    for x in range(int(x1), int(x2), 18):
        d.line((x, y, min(x+9, x2), y), fill=color, width=2)


def candle(d, x, py, row, width=90):
    o, h, l, c = [row[k] for k in ('open', 'high', 'low', 'close')]
    assert l <= min(o, c) <= max(o, c) <= h
    color = GREEN if c > o else RED
    d.line((x, py(h), x, py(l)), fill=color, width=4)
    d.rectangle((x-width/2, py(max(o, c)), x+width/2, py(min(o, c))), fill=color)


def save(im, id, description, pages, **data):
    p = OUT/(id+'.png')
    im.save(p, optimize=True)
    raw = p.read_bytes()
    return dict(id=id, src='/course-reconstruction/module-05/editorial/'+p.name,
                width=im.width, height=im.height, bytes=len(raw), sha256=hashlib.sha256(raw).hexdigest(),
                description=description, sourcePages=pages, **data)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    assets = []
    im, d = canvas('Anatomía: mide antes de interpretar', 'Cuerpo = |C − O|. Rango = H − L. Una mecha pequeña no significa control absoluto.')
    rows = [dict(open=100.5, high=104, low=100, close=103.75), dict(open=103.5, high=104, low=100, close=100.25)]
    for i, row in enumerate(rows):
        x, y, w, h = panel(d, (60+i*860, 230, 820, 730), ['Compradora', 'Vendedora'][i],
                          'El cuerpo mide 3,25 y el rango 4. La forma necesita contexto; no identifica a los participantes.')
        py = lambda p: y+h-(p-99.5)/5*h
        cx = x+120
        candle(d, cx, py, row, 150)
        # Separate key avoids overlapping labels near the candle endpoints.
        labels = [('Apertura O', row['open']), ('Máximo H', row['high']), ('Mínimo L', row['low']), ('Cierre C', row['close'])]
        for j, (label, value) in enumerate(labels):
            text(d, (x+275, y+j*65), f'{label}: {value:g}'.replace('.', ','), 430, 26, INK, True)
        text(d, (x+275, y+285), 'Mecha corta al cierre: 0,25\nMecha opuesta: 0,50', 430, 25, MUTED)
    assets.append(save(im, 'anatomia-medida', 'Dos velas con cuerpo 3,25 y rango 4: cierre comprador próximo al máximo y vendedor próximo al mínimo. Valores OHLC ficticios.', [80, 81, 100, 101], ohlc=rows))

    im, d = canvas('Reacción y ruptura: dos acontecimientos', 'La recompra o reventa puede aparecer antes de atravesar la línea de confirmación.')
    sequences = [[9, 2, 6, 3, 5, 7], [2, 9, 5, 8, 6, 4]]
    for i, values in enumerate(sequences):
        area = panel(d, (60+i*860, 230, 820, 730), ['W · Compras', 'M · Ventas'][i],
                     ['En 5 hay reacción, pero la referencia 6 sigue pendiente. El tramo discontinuo hasta 7 es un escenario posterior.',
                      'En 6 hay reacción, pero la referencia 5 sigue pendiente. El tramo discontinuo hasta 4 es un escenario posterior.'][i])
        at = plot(d, area, values, projection=True, labels=[(1, 'Test 1'), (3, 'Test 2')])
        level = [6, 5][i]
        dashed(d, area[0], area[0]+area[2], at(0, level)[1])
        text(d, (area[0], area[1]-27), f'Línea azul: referencia {level}', area[2], 23, BLUE, True)
        px, py = at(4, values[4])
        d.ellipse((px-10, py-10, px+10, py+10), fill=INK)
    assets.append(save(im, 'secuencia-w-m', 'W y M con dos tests, reacción local y ruptura todavía hipotética. La línea azul no se considera superada antes del cruce.', [85, 86, 103, 106], series=sequences, references=[6, 5]))

    im, d = canvas('La misma vela, distinto obstáculo', 'Compara la distancia a la resistencia. Una vela amplia cerca de un techo puede ser una entrada tardía.')
    for i, ceiling in enumerate([108, 104.25]):
        x, y, w, h = panel(d, (60+i*860, 230, 820, 730), ['A · Después del segundo test', 'B · Después de un avance extendido'][i],
                          ['Resistencia en 108. La ubicación permite estudiar la candidata; todavía no hay activación ni garantía.',
                           'Resistencia en 104,25. La forma es idéntica, pero el obstáculo está muy próximo. No implica un giro obligatorio.'][i])
        py = lambda p: y+h-(p-99)/10*h
        candle(d, x+155, py, rows[0], 135)
        dashed(d, x, x+w, py(ceiling), RED)
        text(d, (x+280, py(ceiling)-40), f'Resistencia {ceiling:g}'.replace('.', ','), 420, 25, RED, True)
        text(d, (x+300, y+h-155), 'Misma vela:\nH 104 · L 100\nC 103,75', 400, 25, INK)
    assets.append(save(im, 'contexto-y-obstaculo', 'Una misma vela compradora frente a dos resistencias diferentes: 108 y 104,25. Forma y ubicación no son equivalentes.', [86, 89, 105], candle=rows[0], resistances=[108, 104.25]))

    im, d = canvas('La candidata solo espera la vela siguiente', 'Máximo de candidata: 104. Tick: 0,25. Nivel de activación del ejemplo: 104,25.')
    next_rows = [dict(open=103.75, high=104, low=102.5, close=103), dict(open=103.75, high=105, low=103.5, close=104.75)]
    for i, row in enumerate(next_rows):
        x, y, w, h = panel(d, (60+i*860, 230, 820, 730), ['No alcanza 104,25 → caduca', 'Alcanza 104,25 → activación teórica'][i],
                          ['Al terminar la vela siguiente se cancela la candidata. Un cruce posterior no la reactiva.',
                           'El modelo registra un cruce dentro de su vigencia. No prueba el precio real de ejecución ni el resultado.'][i])
        py = lambda p: y+h-(p-99.5)/6*h
        candle(d, x+130, py, rows[0], 95)
        candle(d, x+380, py, row, 95)
        dashed(d, x, x+w, py(104.25))
        text(d, (x, y-27), 'Azul: 104,25', w, 23, BLUE, True)
        text(d, (x+40, y+h-20), 'Candidata', 230, 23, INK)
        text(d, (x+290, y+h-20), 'Siguiente', 240, 23, INK)
    assets.append(save(im, 'vigencia-candidata', 'Dos velas siguientes posibles: una no alcanza el nivel y la candidata caduca; otra lo cruza y activa el modelo, sin demostrar ejecución real.', [91], candidate=rows[0], nextCandles=next_rows, entry=104.25, tick=.25))

    im, d = canvas('Un rango de vela no siempre equivale a 1R', 'H = 104, L = 100, tick = 0,25. Un tick de margen para entrada y stop. Sin costes ni deslizamiento.')
    calc = []
    for i, direction in enumerate(['compra', 'venta']):
        entry = D('104.25') if i == 0 else D('99.75')
        stop = D('99.75') if i == 0 else D('104.25')
        sign = 1 if i == 0 else -1
        risk = abs(entry-stop)
        target_range, target_r = entry+sign*D('4'), entry+sign*risk
        x, y, w, h = panel(d, (60+i*860, 230, 820, 730), ['Compra · Distancia de riesgo 4,50', 'Venta · Distancia de riesgo 4,50'][i],
                          'Rango = 4; riesgo = 4,50. Los márgenes explican la diferencia. Cambiar el stop cambia 1R.')
        values = [('Entrada', entry, INK), ('Stop', stop, RED), ('Un rango', target_range, BLUE), ('1R', target_r, GREEN)]
        for j, (label, value, color) in enumerate(values):
            yy = y+j*83
            d.line((x+10, yy+19, x+165, yy+19), fill=color, width=4)
            text(d, (x+195, yy), f'{label}: {value:.2f}'.replace('.', ','), 490, 29, color, True)
        calc.append(dict(direction=direction, high=104, low=100, tick=.25, entry=float(entry), stop=float(stop), risk=float(risk), range=4, targetRange=float(target_range), targetR=float(target_r)))
    assets.append(save(im, 'rango-y-riesgo', 'Cálculo separado de rango, entrada, stop y 1R para compra y venta. La amplitud de la vela no incluye los márgenes de la orden.', [91, 92], calculations=calc))

    im, d = canvas('El OHLC no revela todo el recorrido', 'Misma barra: O 102, H 105, L 99, C 103. Entrada teórica 104,25 y stop 99,75.')
    paths = [[102, 105, 99, 103], [102, 99, 105, 103]]
    for i, prices in enumerate(paths):
        area = panel(d, (60+i*860, 230, 820, 730), ['A · Primero el máximo', 'B · Primero el mínimo'][i],
                     ['El recorrido cruza la entrada y después el stop. Es una trayectoria compatible, no una ejecución acreditada.',
                      'El mínimo ocurre antes de activar; después el recorrido termina en 103. El mismo OHLC permite esta alternativa.'][i])
        normalized = [(v-98)*1.4 for v in prices]
        at = plot(d, area, normalized, projection=False, labels=[(j, str(p)) for j, p in enumerate(prices)])
        for price, color in [(104.25, BLUE), (99.75, RED)]:
            dashed(d, area[0], area[0]+area[2], at(0, (price-98)*1.4)[1], color)
    assets.append(save(im, 'orden-intrabar', 'Dos recorridos compatibles con el mismo OHLC. El orden de visita a entrada y stop no puede deducirse de una barra agregada.', [], paths=paths, ohlc=dict(open=102, high=105, low=99, close=103), entry=104.25, stop=99.75))
    (OUT/'manifest.json').write_text(json.dumps(dict(module=5, kind='editorial-schematic', generator='scripts/render-module-five-diagrams.py', assets=assets), ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print('Rendered', len(assets), 'module 5 diagrams. Original images untouched.')


if __name__ == '__main__':
    main()
