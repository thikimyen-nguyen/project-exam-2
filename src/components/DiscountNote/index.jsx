
function Discount({price, discountedPrice}) {
  return (
    <div className="bg-red p-3 rounded-tl-lg rounded-br-lg text-center">
      Sale {((price - discountedPrice) / price * 100).toFixed()}%
    </div>
  )
}

export default Discount
