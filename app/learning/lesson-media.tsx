'use client';

import { useRef, useState } from 'react';
import type { LessonMedia } from './media-types';
import { mediaTime, safeSeek } from './media-types';
import './media.css';

export function LessonMediaPanel({ media, lessonId }: { media: LessonMedia; lessonId: string }) {
  const player = useRef<HTMLVideoElement>(null);
  const pendingSeek = useRef<number | null>(null);
  const [status, setStatus] = useState('');
  const [failed, setFailed] = useState(false);

  function seek(seconds: number) {
    const video = player.current;
    if (!video) return;
    setStatus('');
    if (video.readyState >= 1 && Number.isFinite(video.duration)) {
      video.currentTime = safeSeek(seconds, video.duration);
      pendingSeek.current = null;
    } else pendingSeek.current = seconds;
    void video.play().catch(() => setStatus('No se pudo iniciar la reproducción. Prueba el botón del reproductor o utiliza la lámina y la transcripción.'));
  }

  function loaded() {
    const video = player.current;
    if (video && pendingSeek.current !== null) {
      video.currentTime = safeSeek(pendingSeek.current, video.duration);
      pendingSeek.current = null;
    }
  }

  return <section className="a2-media" aria-labelledby={`${lessonId}-media-title`}>
    <span className="a2-overline">APRENDE CON EL EJEMPLO · VIDEO Y LÁMINA</span>
    <h2 id={`${lessonId}-media-title`}>{media.title}</h2>
    <p>Mira el ejemplo antes de resolver la práctica. Puedes pausar, cambiar la velocidad desde los controles del reproductor y volver a un capítulo.</p>
    <video ref={player} controls playsInline preload="none" poster={media.poster} width={1280} height={720}
      aria-label={`Video explicativo: ${media.title}`} aria-describedby={`${lessonId}-media-description`}
      onLoadedMetadata={loaded} onError={() => { setFailed(true); setStatus('El video no está disponible. Puedes consultar la lámina y la transcripción o descargar el archivo.'); }}>
      <source src={media.video} type="video/mp4" />
      <track kind="captions" src={media.captions} srcLang="es" label="Español · narración" />
      Tu navegador no permite reproducir este video. Usa los enlaces de descarga y la transcripción.
    </video>
    <p className="a2-media-description" id={`${lessonId}-media-description`}>{mediaTime(media.duration)} · voz sintética en español · subtítulos por escena disponibles en los controles · gráficos didácticos. Ver el video no marca la clase como estudiada.</p>
    {status && <p role={failed ? 'alert' : 'status'}>{status}</p>}
    <nav aria-label="Capítulos del video" className="a2-media-chapters"><ol>{media.chapters.map(chapter => <li key={chapter.start}><button type="button" disabled={failed} onClick={() => seek(chapter.start)}><span>{mediaTime(chapter.start)}</span>{chapter.title}</button></li>)}</ol></nav>
    <details><summary>Ver lámina explicativa sin reproducir el video</summary><figure>
      {/* Exact annotated raster diagram; preserve pixel geometry and readable labels. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={media.poster} width={1280} height={720} alt={media.alt} loading="lazy" />
      <figcaption>{media.alt}</figcaption>
    </figure><a href={media.poster} target="_blank" rel="noopener noreferrer">Abrir lámina a tamaño completo ↗</a></details>
    <details><summary>Leer la explicación completa</summary>{media.chapters.map(chapter => <div className="a2-media-transcript" key={chapter.start}><h3>{mediaTime(chapter.start)} · {chapter.title}</h3><p>{chapter.text}</p></div>)}</details>
    <div className="a2-media-downloads"><a href={media.video} download>Descargar video · {(media.bytes / 1048576).toFixed(1)} MB</a><a href={media.transcript} download>Descargar transcripción</a><a href={media.captions} download>Descargar subtítulos</a></div>
    <small>Adaptación audiovisual del ejemplo de esta clase. No es una grabación del profesor ni evidencia de rentabilidad. Las fuentes originales figuran al final de la lección.</small>
  </section>;
}
