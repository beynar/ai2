export const audioPlayerDescription = `
# AudioPlayer Component

AudioPlayer is a native HTML5 audio player with Svelai chrome. It renders a clickable
waveform as the seek/progress surface and composes controls from Button, Tooltip, and
the shared Slider primitive.

## Import

\`\`\`ts
import { AudioPlayer } from 'svelai/audio-player';
\`\`\`

## Core Props

- **src**: string - Single audio source URL.
- **sources**: AudioPlayerSource[] - Multiple native source candidates.
- **title**: string - Track title.
- **artist**: string - Secondary metadata line.
- **artwork**: string - Optional artwork image URL.
- **waveform**: number[] - Amplitude samples from 0 to 1.
- **waveformVariant**: 'centered' | 'histogram' - Waveform visual mode.
- **waveformBars**: number - Number of bars rendered after resampling.
- **controls**: AudioPlayerControl[] - Toggle play, seek, time, volume, loop, download.
- **download**: boolean | string - true uses the selected source, string uses that href.
- **theme**: AudioPlayerThemeProps - Per-instance theme overrides.

## Notes

The waveform is also the seek input. When no waveform samples are provided, the
component generates a deterministic fallback waveform from source and metadata.
`;
