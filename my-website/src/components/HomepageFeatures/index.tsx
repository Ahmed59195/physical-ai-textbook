import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Concept → Simulation → Reality',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Learn Physical AI through a proven progression: master concepts, train in simulation
        (Gazebo, Isaac Sim), then deploy to real robots. Every chapter includes hands-on code
        and real-world considerations.
      </>
    ),
  },
  {
    title: 'AI-Native Learning',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Optimized for RAG systems and LLM-based tutoring. Structured YAML frontmatter,
        semantic chunking, and self-contained code examples make this textbook work seamlessly
        with AI assistants.
      </>
    ),
  },
  {
    title: 'Industry-Focused',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Learn the same tech stack used by Tesla Optimus, Figure AI, and Boston Dynamics:
        ROS 2, vision-language-action models, NVIDIA Jetson deployment, and sim-to-real transfer.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
