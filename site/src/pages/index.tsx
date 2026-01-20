import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HeroSection() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={clsx('hero hero--dark', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Reading
          </Link>
          <Link
            className="button button--link button--lg"
            style={{ color: 'white', textDecoration: 'none', marginLeft: '1rem' }}
            to="/docs/intro">
            Browse Topics
          </Link>
        </div>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="container margin-vert--xl">
      <section className="row">
        <div className="col col--8 col--offset-2">
          <Heading as="h2" className="margin-bottom--md">What This Is</Heading>
          <p>
            A centralized system for recording technical insights, organizing complex notes, and sharing refined documentation.
            This repository is the single source of truth for my technical journey.
          </p>
          <p>
            The content here is written in <strong>plain Markdown</strong>, prioritizing clarity and long-term utility over tool-specific complexity.
            Expect these notes to evolve, improve, and even change as my understanding deepens.
          </p>
        </div>
      </section>

      <section className="row margin-top--xl">
        <div className="col col--8 col--offset-2">
          <Heading as="h2" className="margin-bottom--md">Areas of Focus</Heading>
          <div className="row">
            {[
              { title: 'Programming', desc: 'Languages, patterns, and software architecture.' },
              { title: 'Databases', desc: 'Storage, indexing, and data modelling.' },
              { title: 'Version Control', desc: 'Git workflows and collaboration best practices.' },
              { title: 'Automation', desc: 'CI/CD, scripting, and infrastructure management.' },
            ].map((prop, idx) => (
              <div key={idx} className="col col--6 margin-bottom--lg">
                <Heading as="h3">{prop.title}</Heading>
                <p>{prop.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="row margin-top--xl">
        <div className="col col--8 col--offset-2">
          <div className="padding-vert--lg border--top">
            <Heading as="h2" className="margin-bottom--md">Philosophy</Heading>
            <ul>
              <li><strong>Notes-first:</strong> The value is in the record-keeping, not the viewer.</li>
              <li><strong>Plain Markdown:</strong> No proprietary formats. Future-proof and portable.</li>
              <li><strong>Tools are secondary:</strong> Docusaurus is the lens, the notes are the focus.</li>
              <li><strong>Open to correction:</strong> Learning is a process of refined mistakes.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HeroSection />
      <main>
        <MainContent />
      </main>
    </Layout>
  );
}
