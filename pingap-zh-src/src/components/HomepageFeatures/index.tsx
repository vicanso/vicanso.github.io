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
        Pingap 以单一自包含可执行文件的形式分发，原生支持 ARM 与 x86 架构。项目提供基于 musl 的纯静态链接构建版本，消除了对系统动态库的依赖，从而确保在包括老旧版本在内的各种 Linux 发行版上实现卓越的兼容性与开箱即用的部署体验。其内置的 Web 管理界面将复杂的配置流程可视化，极大简化了服务的配置、启用与日常维护工作。
      </>
    ),
  },
  {
    title: "强大的插件体系",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        系统核心基于灵活的插件化架构设计，使其能够通过加载不同模块来适应多样化的应用场景与复杂的业务需求。内置及社区支持的插件覆盖了关键功能领域，例如：身份认证与授权、动态数据压缩、高性能静态资源服务以及多级缓存策略等。
      </>
    ),
  },
  {
    title: "高性能",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        Pingap 采用 Rust 语言开发，并构建于久经考验的 Pingora 异步网络框架之上。得益于 Rust 语言的内存安全保证和无畏并发模型，Pingap 在实现卓越网络吞吐量和低延迟性能的同时，从根本上杜绝了常见的内存安全漏洞。这一技术选型确保了服务在严苛生产环境下的高安全性和高运行可靠性。
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
