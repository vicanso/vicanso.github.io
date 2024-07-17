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
    title: "简单易用",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        单一可执行文件，无其它动态库等的依赖，并提供Web界面式的配置管理，快速配置启用
      </>
    ),
  },
  {
    title: "强大的插件体系",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>基于插件体系可满足各种应用场景，如应用鉴权、数据压缩以及缓存等</>
    ),
  },
  {
    title: "高性能",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>基于rust与pingora构建，性能表现可圈可点，且安全可靠</>,
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
