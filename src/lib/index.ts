// place files you want to import through the `$lib` alias in this folder.
export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function formatPgpBlock(pgpBlock: string) {
  const pgpBegin = '-----BEGIN PGP';
  const pgpEnd = '-----END PGP';
  const headerIndex = pgpBlock.indexOf(pgpBegin);
  const footerIndex = pgpBlock.lastIndexOf(pgpEnd);
  if (headerIndex === -1 || footerIndex === -1) {
    throw new Error('PGP block does not contain valid header or footer');
  }

  // Extract header and footer
  const header = pgpBlock.substring(headerIndex, pgpBlock.indexOf('\n', headerIndex) + 1);
  const footer = pgpBlock.substring(footerIndex, pgpBlock.indexOf('\n', footerIndex) + 1);
  // Extract the body between header and footer
  let body = pgpBlock.substring(pgpBlock.indexOf('\n', headerIndex) + 1, footerIndex);
  // Remove any whitespace characters from the body
  body = body.replace(/\s+/g, '');
  // Break the body into 64-character lines
  let formattedBody = '';
  while (body.length > 0) {
    const line = body.substring(0, 64);
    body = body.substring(64);
    formattedBody += line + '\n';
  }
  // Trim the trailing newline from the formatted body
  formattedBody = formattedBody.trimEnd();

  const formattedPGPBlock = header + '\n' + formattedBody + '\n' + footer;
  return formattedPGPBlock;
}