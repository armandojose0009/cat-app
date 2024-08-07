// jest.setup.ts

// Puedes incluir cualquier configuración global o inicialización necesaria para tus pruebas aquí.

// Por ejemplo, si usas `sinon` para mocks y spies, puedes configurar `sinon` aquí.
import sinon from 'sinon';

// Configura el entorno para los tests si es necesario
globalThis.sinon = sinon;

// Puedes también añadir cualquier configuración global para tu entorno de pruebas aquí.

// Opcional: Configura los mocks globales, spies, etc.
// globalThis.someGlobalMock = sinon.createStubInstance(SomeClass);

// Si usas `fetch` en tus pruebas, podrías configurar un mock global aquí.
// import fetch from 'node-fetch';
// globalThis.fetch = fetch;

// Puedes importar cualquier setup adicional aquí, como el adaptador para Enzyme si estás usando React.

