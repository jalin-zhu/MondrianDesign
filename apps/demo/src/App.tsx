import React, { useState } from 'react';
import {
  Alert,
  AudioPlayer,
  Avatar,
  Badge,
  Button,
  ButtonList,
  Card,
  Checkbox,
  DialogWindow,
  ImageViewer,
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
  const [dialogOpen, setDialogOpen] = useState(false);

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

          {/* ===== 复合组件模板 ===== */}

          <section className="demo-panel">
            <h2>ImageViewer</h2>
            <ImageViewer
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
              alt="蒙德里安风格建筑"
              title="蒙德里安灵感"
              subtitle="几何抽象"
              caption="点击图片可放大查看"
              tone="white"
            />
          </section>

          <section className="demo-panel">
            <h2>DialogWindow</h2>
            <ButtonList
              items={[
                { label: '打开确认框', tone: 'blue', onClick: () => setDialogOpen(true) },
              ]}
            />
            <DialogWindow
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              title="确认删除"
              icon={<span>🗑️</span>}
              size="sm"
              actions={[
                { label: '取消', variant: 'outlined', cancel: true },
                {
                  label: '确认删除',
                  tone: 'red',
                  onClick: () => {
                    console.log('删除已确认');
                  },
                },
              ]}
            >
              <p>此操作不可撤销。你确定要删除选中的项目吗？</p>
            </DialogWindow>
          </section>

          <section className="demo-panel">
            <h2>ButtonList</h2>
            <p style={{ margin: '0 0 8px', fontSize: 13, fontWeight: 600 }}>横向排列</p>
            <ButtonList
              items={[
                { label: '编辑', tone: 'blue', size: 'sm' },
                { label: '保存', tone: 'black', size: 'sm' },
                { label: '删除', tone: 'red', variant: 'outlined', size: 'sm' },
              ]}
            />
            <p style={{ margin: '12px 0 8px', fontSize: 13, fontWeight: 600 }}>纵向排列</p>
            <ButtonList
              items={[
                { label: '复制', block: true },
                { label: '粘贴', block: true },
                { label: '清空', block: true, variant: 'outlined', tone: 'red' },
              ]}
              direction="vertical"
              align="stretch"
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
