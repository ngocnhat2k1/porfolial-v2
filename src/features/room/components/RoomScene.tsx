import { ArtImage } from '@/shared/components/ArtImage';
import { Layer } from '@/shared/components/Scene';
import { deskArea, place, ratio } from '../constants/placements';
import { ActionHotspot } from './ActionHotspot';
import { LinkHotspot } from './LinkHotspot';
import { Mascot } from './Mascot';
import { PianoKeys } from './PianoKeys';
import { Area, PhotoFrame, ScreenMarquee, SkillNotes, SocialTiles } from './RoomDecor';
import styles from './Room.module.css';

/**
 * Nhật's room, composed back to front. Everything here renders on the server;
 * only the hotspots that react in place (Mascot, ActionHotspot, PianoKeys) ship JavaScript.
 */
export function RoomScene() {
  return (
    <>
      {/* Wall (the wall itself is CSS on the viewport, see .wall) */}
      <Layer {...place.window}>
        <LinkHotspot href="/" label="Back to the balcony">
          <ArtImage name="obj-window" alt="" ratio={ratio.window} sizes="22vw" eager />
        </LinkHotspot>
      </Layer>
      <Layer {...place.pinboard}>
        <LinkHotspot href="/resume" label="Resume">
          <ArtImage name="obj-pinboard" alt="" ratio={ratio.pinboard} sizes="25vw" />
          <SkillNotes />
        </LinkHotspot>
      </Layer>
      <Layer {...place.shelf}>
        <ArtImage name="obj-shelf" alt="" ratio={ratio.shelf} sizes="25vw" />
      </Layer>
      <Layer {...place.phone}>
        <ActionHotspot action="phone" label="Mobile games">
          <ArtImage name="obj-phone" alt="" ratio={ratio.phone} sizes="4vw" />
        </ActionHotspot>
      </Layer>
      <Layer {...place.trophy}>
        <ActionHotspot action="trophy" label="Employee of the Year">
          <ArtImage name="obj-trophy" alt="" ratio={ratio.trophy} sizes="6vw" />
        </ActionHotspot>
      </Layer>
      <Layer {...place.photo}>
        <PhotoFrame />
      </Layer>
      <Layer {...place.socials}>
        <SocialTiles />
      </Layer>

      {/* Nhật's real desk: the monitor opens the projects, the MIDI keyboard plays */}
      <Layer {...place.desk}>
        <div className={styles.desk}>
          <ArtImage name="obj-desk" alt="" ratio={ratio.desk} sizes="(orientation: portrait) 60vw, 26vw" eager />
          <Area {...deskArea.screen}>
            <LinkHotspot href="/work" label="Projects" className={styles.zone}>
              <ScreenMarquee />
            </LinkHotspot>
          </Area>
          <Area {...deskArea.keys}>
            <PianoKeys />
          </Area>
        </div>
      </Layer>

      {/* Floor */}
      <Layer {...place.rug}>
        <ArtImage name="obj-rug" alt="" ratio={ratio.rug} sizes="40vw" />
      </Layer>
      <Layer {...place.mascot}>
        <Mascot
          standing={<ArtImage name="char-stand" alt="" ratio={ratio.mascot} sizes="(orientation: portrait) 45vw, 14vw" eager />}
          waving={<ArtImage name="char-wave" alt="" ratio={ratio.mascot} sizes="(orientation: portrait) 45vw, 14vw" />}
          ratio={ratio.mascot}
        />
      </Layer>
      <Layer {...place.mic}>
        <ActionHotspot action="mic" label="Singing">
          <ArtImage name="obj-mic" alt="" ratio={ratio.mic} sizes="6vw" />
        </ActionHotspot>
      </Layer>
      <Layer {...place.guitar}>
        <ActionHotspot action="guitar" label="Strum the guitar">
          <ArtImage name="obj-guitar" alt="" ratio={ratio.guitar} sizes="8vw" />
        </ActionHotspot>
      </Layer>
      <Layer {...place.plantLeft}>
        <ArtImage name="obj-plant-left" alt="" ratio={ratio.plantLeft} sizes="10vw" />
      </Layer>
      <Layer {...place.plantRight}>
        <ArtImage name="obj-plant-right" alt="" ratio={ratio.plantRight} sizes="10vw" />
      </Layer>
    </>
  );
}
