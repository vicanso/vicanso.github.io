import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Easy to Use",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Pingap is distributed as a single, self-contained executable with native support for both ARM and x86 architectures. The project provides a fully statically linked build based on musl, which eliminates dependencies on system dynamic libraries. This ensures excellent compatibility and an out-of-the-box deployment experience across a wide range of Linux distributions, including legacy versions. Furthermore, its built-in web management interface visualizes the complex configuration process, greatly simplifying service setup, deployment, and routine maintenance.
      </>
    ),
  },
  {
    title: "Powerful Plugin System",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        The system's core is built upon a flexible, plugin-based architecture, enabling it to adapt to diverse use cases and complex business requirements by loading different modules. The built-in plugins cover critical functional areas, including: Authentication and Authorization, dynamic data compression, high-performance static asset serving, and multi-level caching strategies.
      </>
    ),
  },
  {
    title: "High Performance",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Pingap is developed in Rust and built upon the battle-tested Pingora asynchronous networking framework. Leveraging Rust's memory safety guarantees and its fearless concurrency model, Pingap achieves exceptional network throughput and low-latency performance while fundamentally eliminating common memory safety vulnerabilities. This technical foundation ensures the service delivers high security and operational reliability, even in demanding production environments.

      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
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

export default function HomepageFeatures(): JSX.Element {
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
