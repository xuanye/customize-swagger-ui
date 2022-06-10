declare module SwaggerV2 {
  export interface SwaggerV2 {
    swagger: string;
    info: Info;
    host: string;
    basePath?: string;
    tags: Tag[];
    schemes?: string[];
    paths: Record<string, Record<string, Request>>;
    definitions: Record<string, Schema>;
  }
  export interface Info {
    description: string;
    version: string;
    title: string;
    termsOfService?: string;
    contact?: Contact;
    license?: License;
  }
  export interface Contact {
    email: string;
  }

  export interface License {
    name: string;
    url: string;
  }

  export interface Tag {
    name: string;
    description: string;
    externalDocs?: ExternalDocs;
  }

  export interface ExternalDocs {
    description: string;
    url: string;
  }

  export interface Request {
    tags: string[];
    summary?: string;
    description?: string;
    operationId: string;
    consumes?: string[];
    produces: string[];
    parameters: Parameters[];
    responses: Record<string, Response>;
    deprecated?: boolean;
  }

  export interface Parameter {
    name: string;
    in: string;
    schema?: EntitySchema;
    type?: string;
    description?: string;
    required?: boolean;
    maximum?: number;
    minimum?: number;
    format?: string;
    items?: Reference;
  }

  export interface Response {
    description?: string;
    schema?: Reference;
  }
  export interface Reference {
    type?: string;
    items?: Reference;
    $ref?: string;
  }
  export interface Schema {
    type?: string;
    $ref?: string;
    items: Schema;
    format?: string;
    required?: string[];
    description?: string;
    enum: string[];
    properties?: Record<string, Schema>;
  }
}

declare module SwaggerJson {
  export interface SwaggerJson {
    version: string;
    info: Info;
    services: ApiService[];
    definitions: Record<string, Schema>;
  }
  export interface Info {
    description: string;
    version: string;
    title: string;
    termsOfService?: string;
    contact?: Contact;
    license?: License;
  }

  export interface Contact {
    email: string;
  }

  export interface License {
    name: string;
    url: string;
  }

  export interface ApiService {
    name: string;
    description: string;
    methods: ApiMethod[];
    methodIndex: Record<string, number>;
  }

  export interface ApiMethod extends SwaggerV2.Request {
    method: string;
    path: string;
    id: string;
  }
  export interface Request {
    tags: string[];
    summary?: string;
    description?: string;
    operationId: string;
    consumes?: string[];
    produces: string[];
    parameters: Parameters[];
    responses: Record<string, Response>;
    deprecated?: boolean;
  }

  export interface Parameter {
    name: string;
    in: string;
    schema?: EntitySchema;
    type?: string;
    description?: string;
    required?: boolean;
    maximum?: number;
    minimum?: number;
    format?: string;
    default?: string;
    items?: Reference;
  }

  export interface Response {
    description?: string;
    schema?: Schema;
  }
  export interface Schema {
    name?: string;
    type?: string;
    $ref?: string;
    items?: Schema;
    format?: string;
    required?: string[];
    description?: string;
    enum?: string[];
    properties?: Record<string, Schema>;
  }
}
