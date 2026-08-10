export function esm() {
  const { Extension } = (window as any).tempExt;
  delete (window as any).tempExt;
  return {
    __esModule: true,
    default: Extension,
  };
}
