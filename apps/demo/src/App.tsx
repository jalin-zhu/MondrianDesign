import React, { useState } from 'react';
import {
  Alert,
  AudioPlayer,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  MondrianProvider,
  Progress,
  Radio,
  Skeleton,
  Select,
  Switch,
  Tabs,
  Textarea,
  Toast,
  VideoPlayer,
} from 'mondrian-design';

export default function App(): React.JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);

  return (
    <MondrianProvider>
      <main className="demo-root">
        <h1>MondrianDesign Demo</h1>
        <p>18 practical components in a Mondrian block visual language.</p>

        <div className="demo-grid">
          <section className="demo-panel">
            <h2>Button + Badge</h2>
            <div className="demo-row">
              <Button tone="red">Primary</Button>
              <Button tone="yellow" variant="outlined">
                Outlined
              </Button>
              <Badge tone="blue">BETA</Badge>
            </div>
          </section>

          <section className="demo-panel">
            <h2>Input + Select</h2>
            <div className="demo-row" style={{ flexDirection: 'column' }}>
              <Input placeholder="Search block..." />
              <Textarea placeholder="Write release notes..." rows={3} />
              <Select defaultValue="blue">
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="blue">Blue</option>
              </Select>
            </div>
          </section>

          <section className="demo-panel">
            <h2>Checkbox + Radio</h2>
            <div className="demo-row" style={{ flexDirection: 'column' }}>
              <Checkbox label="Enable hard grid lines" defaultChecked />
              <Radio name="layout" label="Asymmetric layout" defaultChecked />
              <Radio name="layout" label="Symmetric layout" />
              <Switch
                label={switchOn ? 'Contrast mode on' : 'Contrast mode off'}
                checked={switchOn}
                onCheckedChange={setSwitchOn}
                tone="blue"
              />
            </div>
          </section>

          <section className="demo-panel">
            <h2>Tabs</h2>
            <Tabs
              items={[
                { key: 'palette', label: 'Palette', content: 'Primary colors: red/yellow/blue.' },
                { key: 'grid', label: 'Grid', content: 'Use thick black separators.' },
                { key: 'motion', label: 'Motion', content: 'Fast, minimal interactions.' },
              ]}
            />
          </section>

          <section className="demo-panel">
            <h2>Card</h2>
            <Card
              tone="white"
              title="Component Card"
              subtitle="Structured information block"
            >
              Keep content geometric, high contrast, and grid-driven.
            </Card>
            <div style={{ marginTop: 12 }}>
              <Progress value={68} tone="red" />
            </div>
          </section>

          <section className="demo-panel">
            <h2>Modal + Toast</h2>
            <div className="demo-row">
              <Button tone="black" onClick={() => setModalOpen(true)}>
                Open Modal
              </Button>
              <Button tone="blue" onClick={() => setToastOpen(true)}>
                Show Toast
              </Button>
            </div>
          </section>

          <section className="demo-panel">
            <h2>Alert + Avatar</h2>
            <div className="demo-row" style={{ alignItems: 'center' }}>
              <Avatar name="Piet Mondrian" tone="yellow" />
              <Avatar name="Design Team" tone="blue" />
            </div>
            <div style={{ marginTop: 12 }}>
              <Alert
                title="Review needed"
                description="2 new component stories are waiting for QA."
                tone="yellow"
                action={<Button tone="black">Open Queue</Button>}
              />
            </div>
          </section>

          <section className="demo-panel">
            <h2>Skeleton</h2>
            <div style={{ display: 'grid', gap: 8 }}>
              <Skeleton height={16} />
              <Skeleton height={16} width="84%" />
              <Skeleton width={46} height={46} circle />
            </div>
          </section>

          <section className="demo-panel">
            <h2>Audio Player</h2>
            <AudioPlayer
              title="Ambient Track"
              subtitle="Sample stream"
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
              preload="none"
              tone="yellow"
            />
          </section>

          <section className="demo-panel">
            <h2>Video Player</h2>
            <VideoPlayer
              title="Demo Clip"
              subtitle="Sample MP4"
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              preload="metadata"
              tone="white"
            />
          </section>
        </div>

        <Modal open={modalOpen} onOpenChange={setModalOpen} title="Mondrian Modal">
          Dialog content follows the same color block language.
        </Modal>
        <Toast
          open={toastOpen}
          onOpenChange={setToastOpen}
          title="Saved"
          description="Your palette has been updated."
          tone="red"
        />
      </main>
    </MondrianProvider>
  );
}
