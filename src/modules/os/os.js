export const os = async (path, ...params) => {
  console.log(`os: ${params.join(" ,")}`);
  return { path };
};
