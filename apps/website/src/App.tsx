import React, { useState } from 'react';
import {
  Button,
  Card,
  Alert,
  Badge,
  Input,
  Select,
  Switch,
  Progress,
  Tabs,
  Modal,
  Toast,
  Checkbox,
  Radio,
  Avatar,
  Skeleton,
  Textarea,
} from 'mondrian-design';

const COMPONENTS = [
  'Alert', 'AudioPlayer', 'Avatar', 'Badge', 'Button',
  'Card', 'Checkbox', 'Input', 'Modal', 'Progress',
  'Radio', 'Select', 'Skeleton', 'Switch', 'Tabs',
  'Textarea', 'Toast', 'VideoPlayer',
];

function Hero() {
  return (
    <section className="hero">
      <span className="hero-badge">v0.1.0</span>
      <h1>
        Bold Geometry.<br />
        <span>Primary Colors.</span><br />
        Pure React.
      </h1>
      <p>
        A Mondrian-inspired UI component library that brings the iconic art style of Piet Mondrian to your React applications.
      </p>
      <div className="hero-actions">
        <Button tone="yellow" size="lg" onClick={() => document.getElementById('quickstart')?.scrollIntoView({ behavior: 'smooth' })}>
          Get Started
        </Button>
        <Button
          variant="outlined"
          tone="white"
          size="lg"
          onClick={() => window.open('https://github.com/jalin-zhu/MondrianDesign', '_blank')}
        >
          View on GitHub
        </Button>
      </div>
    </section>
  );
}

function ColorStrips() {
  return (
    <div className="color-strips">
      <div /><div /><div /><div /><div /><div />
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="section" id="features">
      <h2 className="section-title">Why MondrianDesign?</h2>
      <p className="section-subtitle">A design system built on bold geometry and uncompromising simplicity.</p>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon" style={{ background: '#d62828', color: '#fff' }}>T</div>
          <h3>Theme System</h3>
          <p>CSS custom properties power a flexible theming engine. Override colors, borders, spacing, shadows, and motion in one place.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" style={{ background: '#f7d038' }}>TS</div>
          <h3>TypeScript First</h3>
          <p>Every component is fully typed with precise prop definitions. Enjoy autocomplete, type safety, and great DX out of the box.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" style={{ background: '#1d4ed8', color: '#fff' }}>A</div>
          <h3>Accessible</h3>
          <p>ARIA attributes, keyboard navigation, focus management, and screen-reader support baked into every component.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" style={{ background: '#111', color: '#fff' }}>M</div>
          <h3>Minimal & Lightweight</h3>
          <p>No external runtime dependencies beyond React. Tree-shakeable ESM and CJS builds. Import only what you need.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" style={{ borderColor: '#d62828', color: '#d62828' }}>18</div>
          <h3>18 Components</h3>
          <p>Covers forms, feedback, navigation, media, and data display -- with more on the way.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" style={{ borderColor: '#1d4ed8', color: '#1d4ed8' }}>R</div>
          <h3>React 18 & 19</h3>
          <p>Compatible with both React 18 and React 19. Forward-looking API design with modern React patterns.</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat-item">
          <div className="stat-number" style={{ color: '#d62828' }}>18</div>
          <div className="stat-label">Components</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" style={{ color: '#1d4ed8' }}>0</div>
          <div className="stat-label">External Dependencies</div>
        </div>
        <div className="stat-item">
          <div className="stat-number" style={{ color: '#f7d038' }}>100%</div>
          <div className="stat-label">TypeScript</div>
        </div>
      </div>
    </section>
  );
}

function ComponentShowcase() {
  const [switchOn, setSwitchOn] = useState(false);
  const [tabKey, setTabKey] = useState('a');
  const [modalOpen, setModalOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const tabs = [
    { key: 'a', label: 'Overview', content: <p style={{ padding: 16 }}>The Mondrian palette is defined by bold primary colors and thick black borders.</p> },
    { key: 'b', label: 'Colors', content: <p style={{ padding: 16 }}>Red, yellow, blue, white, and black form the core of every component.</p> },
    { key: 'c', label: 'Grid', content: <p style={{ padding: 16 }}>Asymmetric grids and rectangles create tension and balance, just like Mondrian's paintings.</p> },
  ];

  return (
    <section className="section" id="components">
      <h2 className="section-title">Component Gallery</h2>
      <p className="section-subtitle">Interactive previews of every component in the library.</p>

      <div className="showcase-grid">
        {/* Buttons */}
        <div className="showcase-item">
          <span className="showcase-label">Button</span>
          <div className="showcase-row">
            <Button tone="red" size="sm">Delete</Button>
            <Button tone="yellow">Save</Button>
            <Button tone="blue" size="lg">Submit</Button>
            <Button variant="outlined" tone="black">Cancel</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>

        {/* Input & Form */}
        <div className="showcase-item">
          <span className="showcase-label">Input & Select</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Input placeholder="Email address" size="sm" />
            <Input placeholder="Password" error />
            <Select>
              <option>Option A</option>
              <option>Option B</option>
            </Select>
          </div>
        </div>

        {/* Alert */}
        <div className="showcase-item">
          <span className="showcase-label">Alert</span>
          <Alert title="Update available" tone="blue" description="A new version is ready to install." action={<Button size="sm" tone="blue">Update</Button>} />
        </div>

        {/* Badge */}
        <div className="showcase-item">
          <span className="showcase-label">Badge</span>
          <div className="showcase-row">
            <Badge tone="red">New</Badge>
            <Badge tone="yellow">Draft</Badge>
            <Badge tone="blue">Info</Badge>
            <Badge tone="black">Stable</Badge>
          </div>
        </div>

        {/* Switch & Checkbox */}
        <div className="showcase-item">
          <span className="showcase-label">Switch & Checkbox</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Switch label="Dark mode" checked={switchOn} onCheckedChange={setSwitchOn} />
            <Checkbox label="I agree to the terms" defaultChecked />
            <Radio name="demo" label="Option 1" defaultChecked />
          </div>
        </div>

        {/* Progress */}
        <div className="showcase-item">
          <span className="showcase-label">Progress</span>
          <Progress value={62} tone="blue" />
          <div style={{ height: 12 }} />
          <Progress value={85} tone="red" showValue />
        </div>

        {/* Tabs */}
        <div className="showcase-item">
          <span className="showcase-label">Tabs</span>
          <Tabs items={tabs} value={tabKey} onValueChange={setTabKey} />
        </div>

        {/* Modal & Toast Trigger */}
        <div className="showcase-item">
          <span className="showcase-label">Modal & Toast</span>
          <div className="showcase-row">
            <Button tone="black" onClick={() => setModalOpen(true)}>Open Modal</Button>
            <Button tone="blue" onClick={() => setToastOpen(true)}>Show Toast</Button>
          </div>
          <Modal open={modalOpen} onOpenChange={setModalOpen} title="Confirm Action">
            <p>Are you sure you want to proceed? This action cannot be undone.</p>
          </Modal>
          <Toast
            open={toastOpen}
            onOpenChange={setToastOpen}
            title="Saved"
            description="Your changes have been saved successfully."
            tone="black"
            duration={2500}
          />
        </div>

        {/* Avatar & Skeleton */}
        <div className="showcase-item">
          <span className="showcase-label">Avatar & Skeleton</span>
          <div className="showcase-row">
            <Avatar name="Piet Mondrian" tone="red" size={40} />
            <Avatar name="De Stijl" tone="blue" size={40} />
            <Avatar tone="yellow" size={40} name="PM" />
          </div>
          <div style={{ height: 12 }} />
          <Skeleton width={200} height={16} />
          <div style={{ height: 8 }} />
          <Skeleton width="60%" height={16} />
        </div>

        {/* Textarea */}
        <div className="showcase-item">
          <span className="showcase-label">Textarea</span>
          <Textarea placeholder="Write something..." rows={3} />
        </div>
      </div>

      <div className="comp-list">
        {COMPONENTS.map((c) => (
          <span key={c} className="comp-tag">{c}</span>
        ))}
      </div>
    </section>
  );
}

function QuickStartSection() {
  return (
    <section className="section" id="quickstart">
      <h2 className="section-title">Quick Start</h2>
      <p className="section-subtitle">Get up and running in under a minute.</p>

      <div className="quick-start-grid">
        <Card title="1. Install" tone="white">
          <div className="code-block">
            <span className="comment"># npm</span><br />
            <span className="keyword">npm install</span> mondrian-design<br /><br />
            <span className="comment"># pnpm</span><br />
            <span className="keyword">pnpm add</span> mondrian-design<br /><br />
            <span className="comment"># yarn</span><br />
            <span className="keyword">yarn add</span> mondrian-design
          </div>
        </Card>
        <Card title="2. Use" tone="white">
          <div className="code-block">
            <span className="keyword">import</span> {'{ '}<span className="tag">MondrianProvider</span>, <span className="tag">Button</span> {' }'} <span className="keyword">from</span> <span className="string">'mondrian-design'</span>;<br />
            <span className="keyword">import</span> <span className="string">'mondrian-design/styles.css'</span>;<br /><br />
            <span className="keyword">function</span> <span className="tag">App</span>() {'{'}<br />
            &nbsp;&nbsp;<span className="keyword">return</span> (<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">MondrianProvider</span>&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">Button</span> tone={<span className="string">"blue"</span>}&gt;Hello&lt;/<span className="tag">Button</span>&gt;<br />
            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="tag">MondrianProvider</span>&gt;<br />
            &nbsp;&nbsp;);<br />
            {'}'}
          </div>
        </Card>
      </div>
    </section>
  );
}

function ThemeSection() {
  return (
    <section className="section" id="theme">
      <h2 className="section-title">Custom Theme</h2>
      <p className="section-subtitle">Override any part of the design token system to match your brand.</p>
      <Card tone="white">
        <div className="code-block">
          <span className="keyword">import</span> {'{ '}<span className="tag">MondrianProvider</span>, <span className="tag">createMondrianTheme</span> {' }'} <span className="keyword">from</span> <span className="string">'mondrian-design'</span>;<br /><br />
          <span className="keyword">const</span> theme = <span className="tag">createMondrianTheme</span>({'{'}<br />
          &nbsp;&nbsp;palette: {'{'} red: <span className="string">'#ff4d4d'</span>, blue: <span className="string">'#3b82f6'</span> {'}'},<br />
          &nbsp;&nbsp;border: {'{'} width: <span className="string">'3px'</span> {'}'},<br />
          {'}'});<br /><br />
          <span className="keyword">function</span> <span className="tag">App</span>() {'{'}<br />
          &nbsp;&nbsp;<span className="keyword">return</span> (<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="tag">MondrianProvider</span> theme={'{'}theme{'}'}&gt;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{'/* Your app */'}<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="tag">MondrianProvider</span>&gt;<br />
          &nbsp;&nbsp;);<br />
          {'}'}
        </div>
      </Card>
    </section>
  );
}

function CTASection() {
  return (
    <section className="cta">
      <h2>Ready to build with bold geometry?</h2>
      <p>Start using MondrianDesign in your next React project today.</p>
      <div className="hero-actions">
        <Button
          tone="black"
          size="lg"
          onClick={() => window.open('https://github.com/jalin-zhu/MondrianDesign', '_blank')}
        >
          View on GitHub
        </Button>
        <Button
          variant="outlined"
          tone="black"
          size="lg"
          onClick={() => document.getElementById('quickstart')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        MondrianDesign is open source under the MIT license.
        Built with React + TypeScript.{' '}
        <a href="https://github.com/jalin-zhu/MondrianDesign" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>
    </footer>
  );
}

export function App() {
  return (
    <>
      <header className="site-header">
        <a href="#" className="site-logo">MondrianDesign</a>
        <nav className="site-nav">
          <a href="#features">Features</a>
          <a href="#components">Components</a>
          <a href="#quickstart">Quick Start</a>
          <a href="https://github.com/jalin-zhu/MondrianDesign" target="_blank" rel="noopener noreferrer">GitHub</a>
        </nav>
      </header>
      <ColorStrips />
      <main>
        <Hero />
        <FeaturesSection />
        <ComponentShowcase />
        <QuickStartSection />
        <ThemeSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
