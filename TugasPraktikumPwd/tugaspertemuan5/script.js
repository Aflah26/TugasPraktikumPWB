
$(document).ready(function() {

    const products = [
        { id: 1, name: "Tote Bag Kanvas", price: 75000, stok: 8, icon: "👜" },
        { id: 2, name: "Jam Tangan Minimalis", price: 150000, stok: 5, icon: "⌚" },
        { id: 3, name: "Kacamata Retro", price: 65000, stok: 10, icon: "🕶️" },
        { id: 4, name: "Tas Selempang Casual", price: 120000, stok: 4, icon: "🎒" },
        { id: 5, name: "Dompet Premium", price: 85000, stok: 7, icon: "👛" },
        { id: 6, name: "Botol Minum Stainless", price: 55000, stok: 12, icon: "🥤" }
    ];

    let cart = [];

    const productContainer = document.getElementById("product-list");

    // Menampilkan produk
    products.forEach(product => {

        const card = document.createElement("div");
        card.className = "product-card";

        const iconDiv = document.createElement("div");
        iconDiv.className = "product-img";
        iconDiv.textContent = product.icon;

        const title = document.createElement("h3");
        title.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = `Rp ${product.price.toLocaleString("id-ID")}`;

        const stock = document.createElement("p");
        stock.className = "product-stock";
        stock.textContent = `Stok: ${product.stok}`;

        const btn = document.createElement("button");
        btn.textContent = "Tambah ke Keranjang";
        btn.setAttribute("data-id", product.id);

        card.appendChild(iconDiv);
        card.appendChild(title);
        card.appendChild(price);
        card.appendChild(stock);
        card.appendChild(btn);

        productContainer.appendChild(card);
    });

    // Memperbarui tampilan keranjang
    function updateCartUI() {

        const $cartlist = $("#cart-items");
        $cartlist.empty();

        let totalItems = 0;
        let totalPrice = 0;

        cart.forEach((item, index) => {

            totalItems += item.jumlah;
            totalPrice += item.harga * item.jumlah;

            const $li = $("<li>").html(`
                <span>${item.nama} (${item.jumlah}x) - Rp ${(
                    item.harga * item.jumlah
                ).toLocaleString("id-ID")}</span>

                <button class="remove-btn" data-index="${index}">
                    Hapus
                </button>
            `);

            $cartlist.append($li);
            $li.fadeIn(400);
        });

        $("#cart-count").text(totalItems);

        $("#cart-total").text(
            `Rp ${totalPrice.toLocaleString("id-ID")}`
        );
    }

    // Tambah produk ke keranjang
    $(document).on("click", ".product-card button", function() {

        const id = Number($(this).data("id"));

        const product = products.find(p => p.id === id);

        if (product.stok > 0) {

            product.stok--;

            $(this).siblings(".product-stock").text(
                `Stok: ${product.stok}`
            );

            const existing = cart.find(item => item.id === id);

            if (existing) {
                existing.jumlah++;
            } else {
                cart.push({
                    id: product.id,
                    nama: product.name,
                    harga: product.price,
                    jumlah: 1
                });
            }

            updateCartUI();

        } else {
            alert("Stok produk " + product.name + " sudah habis!");
        }
    });

    // Menghapus produk
    $(document).on("click", ".remove-btn", function() {

        const index = Number($(this).data("index"));

        const $li = $(this).parent();

        if (confirm("Yakin ingin menghapus produk ini?")) {

            const cartItem = cart[index];

            const originalProduct = products.find(
                p => p.id === cartItem.id
            );

            if (originalProduct) {

                originalProduct.stok += cartItem.jumlah;

                $(`.product-card button[data-id="${cartItem.id}"]`)
                    .siblings(".product-stock")
                    .text(`Stok: ${originalProduct.stok}`);
            }

            $li.fadeOut(300, function() {
                cart.splice(index, 1);
                updateCartUI();
            });
        }
    });

    // Mengosongkan keranjang
    $("#empty-cart").on("click", function() {

        if (cart.length === 0) {
            alert("Keranjang Anda sudah kosong.");
            return;
        }

        if (confirm("Yakin ingin mengosongkan keranjang?")) {

            cart.forEach(cartItem => {

                const product = products.find(
                    p => p.id === cartItem.id
                );

                if (product) {

                    product.stok += cartItem.jumlah;

                    $(`.product-card button[data-id="${product.id}"]`)
                        .siblings(".product-stock")
                        .text(`Stok: ${product.stok}`);
                }
            });

            cart = [];

            updateCartUI();

            $("#summary-box").hide();
        }
    });

    // Buka dan tutup keranjang
    $("#toggle-cart").on("click", function() {

        $(".cart-items, .cart-actions").fadeToggle(300);

    });

    // Pencarian produk
    $("#search-input").on("keyup", function() {

        const keyword = $(this).val().toLowerCase();

        $(".product-card").each(function() {

            const productName = $(this)
                .find("h3")
                .text()
                .toLowerCase();

            $(this).toggle(
                productName.indexOf(keyword) > -1
            );
        });
    });

    // Checkout
    $("#checkout-btn").on("click", function() {

        if (cart.length === 0) {
            alert("Keranjang masih kosong!");
            return;
        }

        const buyerName = prompt("Masukkan nama pembeli:");

        if (buyerName && buyerName.trim() !== "") {

            let summaryListHtml = "";
            let grandTotal = 0;

            cart.forEach(item => {

                const subtotal = item.harga * item.jumlah;

                grandTotal += subtotal;

                summaryListHtml += `
                    <li>
                        ${item.nama} (${item.jumlah}x)
                        - Rp ${subtotal.toLocaleString("id-ID")}
                    </li>
                `;
            });

            $("#summary-name").text(buyerName.trim());

            $("#summary-list").html(summaryListHtml);

            $("#summary-total").text(
                grandTotal.toLocaleString("id-ID")
            );

            $("#summary-box").fadeIn();

            alert(
                "Pesanan atas nama " +
                buyerName +
                
                " berhasil dibuat!"
            );
        }
    });

});
