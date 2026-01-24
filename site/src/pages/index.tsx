import type { ReactNode } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HeroSection() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className={clsx('hero hero--dark', styles.heroBanner)}>
      <div className="container">
        <div className="margin-bottom--md">
          <img
            src={useBaseUrl('/img/logo.png')}
            alt="Logo"
            style={{ width: '120px', height: '120px', marginBottom: '1rem' }}
          />
        </div>
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Start Reading
          </Link>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="col col--6 margin-bottom--xl">
      <div className={clsx('card padding--lg card-fancy', styles.featureCard)}>
        <Heading as="h3" className="margin-bottom--sm">{title}</Heading>
        <p>{desc}</p>
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="container margin-vert--xl">
      <section className="row">
        <div className="col col--8 col--offset-2 text--center margin-bottom--xl">
          <Heading as="h2" className="margin-bottom--md">A Living Repository of Technical Wisdom</Heading>
          <p className="text--lg">
            This Knowledge Base is a centralized system for capturing implementation details,
            organizing complex mental models, and sharing refined documentation.
          </p>
        </div>
      </section>

      <section className="row">
        <div className="col col--10 col--offset-1">
          <Heading as="h2" className="margin-bottom--lg text--center">Areas of Focus</Heading>
          <div className="row">
            <Feature
              title="Fundamentals & Systems"
              desc="Deep dives into Linux internals, Bash scripting, and System Design principles."
            />
            <Feature
              title="Engineering & Development"
              desc="Mastering programming languages, API design, and software architecture patterns."
            />
            <Feature
              title="Data & Persistence"
              desc="SQL mastery, database optimization, and modern data modeling techniques."
            />
            <Feature
              title="Operations & Deployment"
              desc="Containerization with Docker, CI/CD automation, and infrastructure as code."
            />
          </div>
        </div>
      </section>

      <section className="row margin-top--xl">
        <div className="col col--8 col--offset-2">
          <div className="padding-vert--xl border--top">
            <Heading as="h2" className="margin-bottom--md">Core Philosophy</Heading>
            <ul>
              <li><strong>Notes-first:</strong> The absolute priority is the quality and clarity of the record. The website is simply a viewer for these assets.</li>
              <li><strong>Portable Knowledge:</strong> Everything is stored in standard Markdown, ensuring long-term accessibility and zero vendor lock-in.</li>
              <li><strong>Continuous Refinement:</strong> Documentation is never finished. It evolves alongside my understanding of the subject matter.</li>
              <li><strong>Clarity over Complexity:</strong> If a concept isn't explained simply, it isn't understood well enough yet.</li>
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
      title="Knowledge Base | Home"
      description={siteConfig.tagline}>
      <HeroSection />
      <main>
        <MainContent />
      </main>
    </Layout>
  );
}
