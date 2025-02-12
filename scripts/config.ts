export const currentPath = process.cwd()
export const config = {
  JAVA_VERSION: '20.0.2',
  JAVA_DIR: './jdk',
  get JAVA_BIN() {
    return `${this.JAVA_DIR}/jdk-${this.JAVA_VERSION}/bin/java`
  },
  SDK_DIR: './sdk',
  CMD_TOOLS_ARCHIVE: 'cmdline-tools.zip',
  CMD_TOOLS_DIR: 'cmdline-tools',
  ANDROID_TOOLS: [
    'build-tools;34.0.0',
    'build-tools;35.0.0',
    'platforms;android-34',
    'platform-tools',
  ],
}
export const envVars: NodeJS.ProcessEnv = {
  PATH: `${currentPath}/${config.JAVA_DIR.slice(2)}/jdk-${config.JAVA_VERSION}/bin:${
    process.env.PATH ?? ''
  }`,
  JAVA_HOME: `${currentPath}/${config.JAVA_DIR.slice(2)}/jdk-${config.JAVA_VERSION}`,
  ANDROID_SDK_ROOT: `${currentPath}/${config.SDK_DIR.slice(2)}`,
  ANDROID_HOME: `${currentPath}/${config.SDK_DIR.slice(2)}`,
}
