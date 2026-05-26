import React from 'react';
import type { ComponentTone } from '../types';
import { cx } from '../utils';

const EMPTY_VTT = 'data:text/vtt;charset=utf-8,WEBVTT';

export interface AudioPlayerProps extends Omit<React.AudioHTMLAttributes<HTMLAudioElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  tone?: ComponentTone;
  captionsSrc?: string;
  captionsLabel?: string;
}

export function AudioPlayer({
  title,
  subtitle,
  tone = 'white',
  captionsSrc,
  captionsLabel = 'Captions',
  className,
  ...props
}: AudioPlayerProps): React.JSX.Element {
  return (
    <figure className={cx('md-media', `md-tone-${tone}`, className)}>
      {title ? <figcaption className="md-media-title">{title}</figcaption> : null}
      {subtitle ? <p className="md-media-subtitle">{subtitle}</p> : null}
      <audio className="md-media-control" controls {...props}>
        <track kind="captions" srcLang="en" label={captionsLabel} src={captionsSrc ?? EMPTY_VTT} />
      </audio>
    </figure>
  );
}
