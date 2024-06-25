import React, { ReactNode } from "react";

type Component = (props: any) => JSX.Element;
type ComponentList = (Component | [component: Component, props: any])[];

interface ComposerProps {
    components: ComponentList;
    children?: ReactNode;
}

function Composer(props: ComposerProps) {
    const { components, children } = props;

    const componentList: [component: Component, props: any][] = components.map(
        (item) => (Array.isArray(item) ? [item[0], item[1]] : [item, {}])
    );

    return (
        <>
            {componentList.reduceRight(
                (otherComponents, [Component, props]) => (
                    <Component {...props}>{otherComponents}</Component>
                ),
                children
            )}
        </>
    );
}

export { Composer };
export type { ComposerProps, ComponentList };
export default Composer;
