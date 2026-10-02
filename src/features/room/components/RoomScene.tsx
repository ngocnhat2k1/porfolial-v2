import { ArtImage, artSrc, overlayStyle } from '@/shared/components/ArtImage';
import type { CSSProperties } from 'react';
import { Layer } from '@/shared/components/Scene';
import { cx } from '@/shared/utils/cx';
import { deskArea, place, ratio } from '../constants/placements';
import { ActionHotspot } from './ActionHotspot';
import { LinkHotspot } from './LinkHotspot';
import { Mascot } from './Mascot';
import { PianoKeys } from './PianoKeys';
import { Area, CodeScreen, NeonSign, PhotoFrame, SocialTiles } from './RoomDecor';
import { LightSwitch, RubberDuck, SayOnHover, SkillNotes, Speaker, WallClock } from './RoomGadgets';
import { objectLines } from '../constants/lines';
import styles from './Room.module.css';

/**
 * Nhật's room, composed back to front. Everything here renders on the server; only the things
 * that react in place (Mascot, ActionHotspot, PianoKeys, RoomGadgets) ship JavaScript.
 */
export function RoomScene() {
  return (
    <>
      {/* Wall (the wall itself is CSS on the viewport, see .wall) */}
      <Layer {...place.window}>
        <LinkHotspot href="/" label="Back to the balcony">
          <ArtImage name="obj-window" alt="" ratio={ratio.window} sizes="22vw" eager />
          <span className={cx(styles.over, styles.moonlit)} style={overlayStyle('obj-window-night')}>
            <ArtImage name="obj-window-night" alt="" ratio={ratio.window} sizes="22vw" />
          </span>
        </LinkHotspot>
      </Layer>
      <Layer {...place.pinboard}>
        <LinkHotspot href="/resume" label="Resume">
          <ArtImage name="obj-pinboard" alt="" ratio={ratio.pinboard} sizes="25vw" />
          <SkillNotes />
        </LinkHotspot>
      </Layer>
      <Layer {...place.neon}>
        <NeonSign />
      </Layer>
      <Layer {...place.clock}>
        <WallClock>
          <ArtImage name="obj-clock" alt="" ratio={ratio.clock} sizes="6vw" />
        </WallClock>
      </Layer>
      <Layer {...place.lightSwitch}>
        <LightSwitch />
      </Layer>
      <Layer {...place.shelf}>
        <ArtImage name="obj-shelf" alt="" ratio={ratio.shelf} sizes="25vw" />
      </Layer>
      <Layer {...place.phone}>
        <ActionHotspot action="phone" label="Mobile games" className={styles.buzz}>
          <ArtImage name="obj-phone" alt="" ratio={ratio.phone} sizes="4vw" />
        </ActionHotspot>
      </Layer>
      <Layer {...place.trophy}>
        <ActionHotspot action="trophy" label="Employee of the Year" className={styles.shine} style={{ '--shape': `url(${artSrc('obj-trophy')})` } as CSSProperties}>
          <ArtImage name="obj-trophy" alt="" ratio={ratio.trophy} sizes="6vw" />
        </ActionHotspot>
      </Layer>
      <Layer {...place.photo}>
        <PhotoFrame />
      </Layer>
      <Layer {...place.socials}>
        <SocialTiles />
      </Layer>

      {/* Nhật's real desk: the monitor opens the projects, the MIDI keyboard plays, the speakers play music */}
      <Layer {...place.desk}>
        <div className={styles.desk}>
          <ArtImage name="obj-desk" alt="" ratio={ratio.desk} sizes="(orientation: portrait) 60vw, 26vw" eager />
          <Area {...deskArea.screen}>
            <LinkHotspot href="/work" label="Projects" className={styles.zone}>
              <SayOnHover line={objectLines.monitor}>
                <CodeScreen />
              </SayOnHover>
            </LinkHotspot>
          </Area>
          <Area {...deskArea.speakerLeft}>
            <Speaker />
          </Area>
          <Area {...deskArea.speakerRight}>
            <Speaker />
          </Area>
          <Area {...deskArea.keys}>
            <PianoKeys />
          </Area>
          <Area {...deskArea.duck}>
            <RubberDuck>
              <ArtImage name="obj-duck" alt="" ratio={ratio.duck} sizes="4vw" />
            </RubberDuck>
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
          waving={<ArtImage name="char-wave" alt="" ratio={ratio.mascot} sizes="(orientation: portrait) 58vw, 18vw" />}
          over={overlayStyle('char-wave')}
        />
      </Layer>
      <Layer {...place.cat}>
        <ActionHotspot action="cat" label="The cat" className={styles.cat}>
          <ArtImage name="obj-cat" alt="" ratio={ratio.cat} sizes="8vw" />
          <span className={styles.over} style={overlayStyle('obj-cat-up')}>
            <ArtImage name="obj-cat-up" alt="" ratio={ratio.cat} sizes="8vw" />
          </span>
          <span className={styles.over} style={overlayStyle('obj-cat-wag')}>
            <ArtImage name="obj-cat-wag" alt="" ratio={ratio.cat} sizes="8vw" />
          </span>
        </ActionHotspot>
      </Layer>
      <Layer {...place.mic}>
        <ActionHotspot action="mic" label="Singing" className={styles.waves}>
          <ArtImage name="obj-mic" alt="" ratio={ratio.mic} sizes="6vw" />
        </ActionHotspot>
      </Layer>
      <Layer {...place.guitar}>
        <ActionHotspot action="guitar" label="Strum the guitar" className={styles.shiver}>
          <ArtImage name="obj-guitar" alt="" ratio={ratio.guitar} sizes="8vw" />
        </ActionHotspot>
      </Layer>
      <Layer {...place.plantLeft}>
        <span className={styles.sway}>
          <ArtImage name="obj-plant-left" alt="" ratio={ratio.plantLeft} sizes="10vw" />
        </span>
      </Layer>
      <Layer {...place.plantRight}>
        <span className={styles.sway}>
          <ArtImage name="obj-plant-right" alt="" ratio={ratio.plantRight} sizes="10vw" />
        </span>
      </Layer>

      {/* Light from the window, the neon and the monitor when the lights are off */}
      <div aria-hidden="true" className={styles.glow} />
    </>
  );
}
