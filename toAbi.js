const fs = require('fs');
const path = require('path');

async function extractAndSaveABI(contractName, outputDir) {
  // Путь к артефактам
  const artifactsPath = path.join(__dirname, '..', 'artifacts', 'contracts', `${contractName}.sol`, `${contractName}.json`);

  // Чтение артефакта
  const artifact = JSON.parse(fs.readFileSync(artifactsPath, 'utf8'));

  // Извлечение ABI
  const abi = artifact.abi;

  // Убедитесь, что директория назначения существует
  fs.mkdirSync(outputDir, { recursive: true });

  // Путь для сохранения ABI
  const abiOutputPath = path.join(outputDir, `${contractName}.json`);

  // Сохранение ABI в файл
  fs.writeFileSync(abiOutputPath, JSON.stringify(abi, null, 2));

  console.log(`ABI for ${contractName} saved to ${abiOutputPath}`);
}

// Пример использования
extractAndSaveABI('ComRev', path.join(__dirname, '..','front', 'src', 'abis')).catch(console.error);
