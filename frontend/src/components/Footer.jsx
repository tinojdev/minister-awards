function Footer() {
  const d = new Date();
  let CurrentYear = d.getFullYear();

  return (
    <>
      <p>{CurrentYear} Minsiteri ry. All rights reserved.</p>
    </>
  );
}

export default Footer;
