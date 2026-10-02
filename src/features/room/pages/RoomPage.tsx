import type { Metadata } from 'next';
import { PageTransition } from '@/shared/components/PageTransition';
import { SceneViewport, Stage } from '@/shared/components/Scene';
import { RoomProvider } from '../components/RoomProvider';
import { RoomScene } from '../components/RoomScene';
import styles from '../components/Room.module.css';

export const metadata: Metadata = {
  title: 'My room',
  description: 'An illustrated room you can explore: projects on the monitor, the résumé on the board, a keyboard and a guitar that really play.',
};

export default function RoomPage() {
  return (
    <PageTransition>
      <main>
        <h1 className="sr-only">Nhật&apos;s room</h1>
        <RoomProvider>
          <SceneViewport mode="explore" className={styles.wall}>
            <Stage>
              <RoomScene />
            </Stage>
          </SceneViewport>
        </RoomProvider>
      </main>
    </PageTransition>
  );
}
