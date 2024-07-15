export type FormkitFields = {
    [key: string]: string | boolean;
};

export type FormkitLoginFields = {
    username: string;
    password: string;
};

// https://formkit.com/essentials/architecture#options
export type FormkitNode = {
    children: FormkitNode[]; //	Child FormKitNode instances.
    config: object; //	Configuration options. These become the defaults of the props object.
    name: string; // The name of the node/input.
    parent: null; // The parent FormKitNode instance.
    plugins: []; // An array of plugin functions.
    props: FormkitNodeProps; // An object of key/value pairs that represent the current node instance details.
    type: input; // The type of FormKitNode to create (list, group, or input).
    value: string | boolean; // The initial value of the input.
};

export type FormkitNodeProps = {
    suffixIcon?: string;
    prefixIcon?: string;
    type: string;
};
