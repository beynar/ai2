export const audioPlayerDescription = `
# AudioPlayer Component

AudioPlayer is a native HTML5 audio player with Svelai chrome. It can render a
waveform or track seek/progress surface and composes controls from Button, Tooltip,
and the shared Slider primitive.

## Import

\`\`\`ts
import { AudioPlayer } from 'svelai/audio-player';
\`\`\`

## Core Props

- **src**: string - Single audio source URL.
- **sources**: AudioPlayerSource[] - Multiple native source candidates.
- **title**: string - Track title.
- **artist**: string - Secondary metadata line.
- **artwork**: string | false - Optional artwork image URL. Omitted artwork renders no fallback.
- **variant**: 'waveform' | 'track' - Primary progress surface.
- **color**: Colors - Theme color for controls and progress fill.
- **waveform**: number[] - Amplitude samples from 0 to 1.
- **waveformVariant**: 'centered' | 'histogram' - Waveform visual mode.
- **waveformBars**: number - Number of bars rendered after resampling.
- **controls**: AudioPlayerControl[] - Toggle play, seek, time, volume, loop, download.
- **header**: Snippet<[AudioPlayerState]> - Replaces the full default header row.
- **controlsSlot**: Snippet<[AudioPlayerState]> - Replaces the default controls area.
- **leading**: Snippet<[AudioPlayerState]> - Renders before default metadata.
- **trailing**: Snippet<[AudioPlayerState]> - Renders after default controls.
- **seek**: Snippet<[AudioPlayerState]> - Replaces the waveform or track seek surface.
- **download**: boolean | string - true uses the selected source, string uses that href.
- **theme**: AudioPlayerThemeProps - Per-instance theme overrides.

## Notes

The waveform and track surfaces are both seek inputs with an invisible range hitbox.
When no waveform samples are provided, the component generates a deterministic fallback
waveform from source and metadata.
`;
