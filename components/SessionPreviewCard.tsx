'use client';

import { useState } from 'react';
import { BarChart3, Camera, CameraOff, ChevronRight, Pause, Play, User, X } from 'lucide-react';
import { useDemoState } from '@/components/DemoStateProvider';

type SessionPreviewCardProps = {
  durationMinutes: number;
  compareLabel: string;
  baselineLabel: string;
  onCompareClick: () => void;
};

export function SessionPreviewCard({ durationMinutes, compareLabel, baselineLabel, onCompareClick }: SessionPreviewCardProps) {
  const [paused, setPaused] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);
  const [ended, setEnded] = useState(false);
  const { showToast } = useDemoState();

  const handleEndSession = () => {
    setEnded(true);
    setPaused(true);
    showToast('Session ended.');
  };

  return (
    <section className={`session-preview ${paused ? 'is-paused' : ''} ${!cameraOn ? 'is-camera-off' : ''}`} aria-label="Study session preview">
      <div className="session-preview-media">
        <span className="session-preview-avatar" aria-hidden="true">{cameraOn ? <User size={34} /> : <CameraOff size={30} />}</span>
        <span className="session-preview-badge"><span className="session-preview-dot" aria-hidden="true" />{ended ? 'Ended' : paused ? 'Paused' : 'Session running'} · {durationMinutes} min</span>
        <div className="session-preview-controls">
          <button className={`preview-icon-button ${!cameraOn ? 'is-off' : ''}`} type="button" onClick={() => setCameraOn((value) => !value)} aria-label={cameraOn ? 'Turn camera off' : 'Turn camera on'} aria-pressed={!cameraOn} disabled={ended}>
            {cameraOn ? <Camera size={15} /> : <CameraOff size={15} />}
          </button>
          <button className="preview-icon-button" type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? 'Resume session' : 'Pause session'} aria-pressed={paused} disabled={ended}>
            {paused ? <Play size={15} /> : <Pause size={15} />}
          </button>
          <button className="preview-icon-button is-end" type="button" onClick={handleEndSession} aria-label="End session" disabled={ended}>
            <X size={15} />
          </button>
        </div>
      </div>
      <button className="session-preview-footer" type="button" onClick={onCompareClick}>
        <BarChart3 size={13} /><span className="session-preview-compare-copy"><span>{compareLabel}</span><small>{baselineLabel}</small></span><ChevronRight size={13} />
      </button>
    </section>
  );
}
