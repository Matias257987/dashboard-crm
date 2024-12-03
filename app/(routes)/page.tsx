import getProducts from "@/actions/get-products";
import Billboard from "@/components/ui/billboard";
import Container from "@/components/ui/container";
import getBillboard from "@/actions/get-billboard";
import getBillboards from "@/actions/get-billboards";
import ProductList from "@/components/product-list";

export const revalidate = 0;

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true });
  const allBillboards = await getBillboards();

  const billboardId = allBillboards.length > 0 ? allBillboards[0].id : null;

  if (!billboardId) {
    console.error("No billboard available");
    return null;
  }

  const billboard = await getBillboard(billboardId);

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
