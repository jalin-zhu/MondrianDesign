import React, { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Input,
  Modal,
  MondrianProvider,
  Radio,
  Select,
  Tabs,
  Toast,
} from 'mondrian-design';

export default function App(): React.JSX.Element {
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <MondrianProvider>
      <main className="demo-root">
        <h1>MondrianDesign Demo</h1>
        <p>10 core components in a Mondrian block visual language.</p>

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

