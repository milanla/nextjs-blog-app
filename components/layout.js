import Header from "./header";
import Footer from "./footer";

export default function Layout({ children, hero }) {
  return (
    <>
      <Header hero={hero} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
