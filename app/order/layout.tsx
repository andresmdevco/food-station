import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";

export default function OrderLayout({ children }: LayoutProps<'/'>) {
  return (
    <>
      <div className="md:flex">
        <OrderSidebar />

        <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5">
          {children}
        </main>

        <OrderSummary />
      </div>
    </>
  )
}