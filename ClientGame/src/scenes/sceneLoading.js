export const createLoadingScreen = function (scene) {
  const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  const loadingScreen = new BABYLON.GUI.Rectangle();
  loadingScreen.width = 0.5;
  loadingScreen.height = "200px";
  loadingScreen.cornerRadius = 20;
  loadingScreen.color = "black";
  loadingScreen.thickness = 4;
  loadingScreen.background = "rgba(0, 0, 0, 0.5)";
  advancedTexture.addControl(loadingScreen);

  const loadingText = new BABYLON.GUI.TextBlock();
  loadingText.text = "Carregando...";
  loadingText.color = "white";
  loadingText.fontSize = 24;
  loadingText.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  loadingText.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_CENTER;
  loadingScreen.addControl(loadingText);
  return advancedTexture;
};
