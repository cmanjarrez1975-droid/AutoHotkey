from __future__ import annotations

import argparse
import hashlib
import json
import shutil
from pathlib import Path

from PIL import Image


FILENAMES = [
    "20260828_m7-vc-4-giro-v-excepcion.png",
    "20260828_m7-vc-5-continuacion-fibonacci.png",
    "20260828_m7-vc-6-apertura-mercado.png",
    "20260828_m7-anatomia-interna-velas-15m.png",
    "20260828_m7-giros-v-estructuras.png",
    "20260828_m7-mapa-trabajo-completo.png",
    "20260828_m7-patrones-compradores-anatomia.png",
    "20260828_m7-patrones-m-variantes.png",
    "20260828_m7-patrones-vendedores-anatomia.png",
    "20260828_m7-patrones-w-variantes.png",
    "20260828_m7-procesos-absorcion.png",
    "20260828_m7-vv-1-ondas-base-m.png",
    "20260828_m7-vv-2-patron-tipo-2-giro.png",
    "20260828_m7-vv-3-retroceso-poc.png",
    "20260828_m7-vv-4-continuacion-m2.png",
    "20260828_m7-vv-5-martillo-continuacion.png",
    "20260828_m7-vv-6-rango-arriba.png",
    "20260828_m7-vc-1-ondas-patron-1.png",
    "20260828_m7-vc-2-patron-tipo-2-giro.png",
    "20260828_m7-vc-3-despejando-dudas-w2.png",
]


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser(description="Conserva los PNG originales recibidos para el módulo 7.")
    parser.add_argument("source", type=Path, help="Carpeta que contiene los veinte PNG recibidos")
    parser.add_argument(
        "--destination",
        type=Path,
        default=Path("public/course-reconstruction/module-07/originals"),
    )
    args = parser.parse_args()

    missing = [name for name in FILENAMES if not (args.source / name).is_file()]
    if missing:
        raise FileNotFoundError(f"Faltan archivos: {', '.join(missing)}")

    args.destination.mkdir(parents=True, exist_ok=True)
    assets: list[dict[str, object]] = []
    for original_name in FILENAMES:
        source = args.source / original_name
        asset_id = original_name.removeprefix("20260828_").removesuffix(".png")
        destination = args.destination / f"{asset_id}.png"
        shutil.copyfile(source, destination)
        if source.read_bytes() != destination.read_bytes():
            raise IOError(f"La copia no coincide byte por byte: {original_name}")
        with Image.open(destination) as image:
            width, height = image.size
            image.verify()
        assets.append(
            {
                "id": asset_id,
                "src": f"/course-reconstruction/module-07/originals/{destination.name}",
                "width": width,
                "height": height,
                "bytes": destination.stat().st_size,
                "sha256": sha256(destination),
                "originalName": original_name,
            }
        )

    manifest = {
        "module": 7,
        "kind": "received-originals",
        "receivedAt": "2026-08-28",
        "assets": assets,
    }
    (args.destination / "manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Conservados {len(assets)} PNG originales; {sum(item['bytes'] for item in assets)} bytes.")


if __name__ == "__main__":
    main()
