import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { ComponentTone } from '../types';
import { cx } from '../utils';
import { Button } from './Button';
import { Card } from './Card';
import { Modal } from './Modal';

export interface ImageViewerProps {
  /** 图片地址 */
  src: string;
  /** 图片替代文本（必须提供，保障无障碍性） */
  alt: string;
  /** 卡片标题 */
  title?: React.ReactNode;
  /** 卡片副标题 */
  subtitle?: React.ReactNode;
  /** 图片下方的说明文字 */
  caption?: React.ReactNode;
  /** 卡片色调 */
  tone?: ComponentTone;
  /** 宽度（默认 100%） */
  width?: string | number;
  /** 高度（默认 auto） */
  height?: string | number;
  /** 图片适应方式 */
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /** 是否允许点击放大（默认 true） */
  zoomable?: boolean;
  /** 是否显示底部工具栏 */
  showToolbar?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 缩放比例变化回调 */
  onZoomChange?: (scale: number) => void;
}

/**
 * ImageViewer - 图片查看器复合组件
 *
 * 整合 Card + Modal + Button，提供缩略图展示 → 点击全屏放大 → 缩放控制
 * 的完整图片浏览体验。
 */
export function ImageViewer({
  src,
  alt,
  title,
  subtitle,
  caption,
  tone = 'white',
  width = '100%',
  height,
  objectFit = 'cover',
  zoomable = true,
  showToolbar = true,
  className,
  onZoomChange,
}: ImageViewerProps): React.JSX.Element {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const SCALE_STEP = 0.25;
  const MIN_SCALE = 0.25;
  const MAX_SCALE = 4;

  const clampScale = useCallback(
    (value: number): number => Math.max(MIN_SCALE, Math.min(MAX_SCALE, value)),
    [],
  );

  const updateScale = useCallback(
    (newScale: number): void => {
      const clamped = clampScale(newScale);
      setScale(clamped);
      onZoomChange?.(clamped);
    },
    [clampScale, onZoomChange],
  );

  const handleLightboxKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (!lightboxOpen) return;
      if (event.key === '+' || event.key === '=') {
        event.preventDefault();
        updateScale(scale + SCALE_STEP);
      } else if (event.key === '-') {
        event.preventDefault();
        updateScale(scale - SCALE_STEP);
      } else if (event.key === '0') {
        event.preventDefault();
        updateScale(1);
      }
    },
    [lightboxOpen, scale, updateScale],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleLightboxKeyDown);
    return () => window.removeEventListener('keydown', handleLightboxKeyDown);
  }, [handleLightboxKeyDown]);

  const handleThumbnailClick = (): void => {
    if (!zoomable || imgError) return;
    setScale(1);
    setLightboxOpen(true);
  };

  const handleLightboxClose = useCallback((): void => {
    setLightboxOpen(false);
    setScale(1);
  }, []);

  const thumbnailStyle: React.CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  return (
    <>
      {/* 缩略图卡片 */}
      <Card
        title={title}
        subtitle={subtitle}
        tone={tone}
        className={cx('md-iv-card', zoomable && !imgError && 'md-iv-zoomable', className)}
        style={thumbnailStyle}
      >
        <div className="md-iv-thumb-wrap">
          {imgError ? (
            <div className="md-iv-error" role="img" aria-label={`${alt} (加载失败)`}>
              <span className="md-iv-error-icon">⚠</span>
              <span className="md-iv-error-text">图片加载失败</span>
            </div>
          ) : (
            <>
              {!imgLoaded && <div className="md-iv-skeleton" />}
              <img
                src={src}
                alt={alt}
                className={cx('md-iv-thumb', imgLoaded && 'md-iv-thumb-loaded')}
                style={{ objectFit }}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
                onClick={handleThumbnailClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleThumbnailClick();
                  }
                }}
                tabIndex={zoomable && !imgError ? 0 : undefined}
                role={zoomable ? 'button' : undefined}
                aria-label={zoomable ? `查看大图: ${alt}` : undefined}
              />
            </>
          )}
        </div>
        {caption && <p className="md-iv-caption">{caption}</p>}
      </Card>

      {/* 全屏灯箱 */}
      {lightboxOpen && (
        <Modal
          open={lightboxOpen}
          onOpenChange={(open) => {
            if (!open) handleLightboxClose();
          }}
          title={title ?? alt}
          closeText="关闭"
          aria-label={`图片查看器: ${alt}`}
        >
          <div className="md-iv-lightbox-body">
            <div className="md-iv-lightbox-img-wrap">
              <img
                src={src}
                alt={alt}
                className="md-iv-lightbox-img"
                style={{
                  transform: `scale(${scale})`,
                  cursor: scale > 1 ? 'grab' : 'zoom-in',
                }}
              />
            </div>
            {showToolbar && (
              <div className="md-iv-toolbar">
                <span className="md-iv-scale-label">{Math.round(scale * 100)}%</span>
                <Button
                  tone="black"
                  size="sm"
                  variant="outlined"
                  onClick={() => updateScale(scale - SCALE_STEP)}
                  disabled={scale <= MIN_SCALE}
                  aria-label="缩小"
                >
                  −
                </Button>
                <Button
                  tone="black"
                  size="sm"
                  variant="outlined"
                  onClick={() => updateScale(1)}
                  disabled={scale === 1}
                  aria-label="重置缩放"
                >
                  1:1
                </Button>
                <Button
                  tone="black"
                  size="sm"
                  variant="outlined"
                  onClick={() => updateScale(scale + SCALE_STEP)}
                  disabled={scale >= MAX_SCALE}
                  aria-label="放大"
                >
                  +
                </Button>
              </div>
            )}
          </div>
        </Modal>
      )}
    </>
  );
}
