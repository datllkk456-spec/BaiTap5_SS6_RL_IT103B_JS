let transactions = "";
let isRunning = true;

do {
    console.log(`
========================================
   HỆ THỐNG QUẢN TRỊ TÀI CHÍNH GYM
========================================
1. Quyết toán hợp đồng gói tập
2. Đối soát chuỗi giao dịch
3. Tra cứu giao dịch
4. Báo cáo tổng kết
0. Thoát
========================================
`);

    let choice = prompt("Nhập lựa chọn:");

    switch (choice) {
        case "1": {
            let sessions = Number(prompt("Nhập số buổi tập:"));

            if (isNaN(sessions) || sessions <= 0) {
                console.log("Số buổi không hợp lệ!");
                break;
            }

            let price = sessions * 350000;
            let discount = 0;

            if (sessions > 50) {
                discount = 0.20;
            } else if (sessions > 30) {
                discount = 0.10;
            }

            let afterDiscount = price * (1 - discount);
            let vat = afterDiscount * 0.08;
            let finalAmount = afterDiscount + vat;

            console.log(`
--- QUYẾT TOÁN HỢP ĐỒNG ---
Số buổi: ${sessions}
Tiền gốc: ${price.toLocaleString()} VNĐ
Giảm giá: ${discount * 100}%
Tiền sau giảm: ${afterDiscount.toLocaleString()} VNĐ
VAT 8%: ${vat.toLocaleString()} VNĐ
Tổng thanh toán: ${finalAmount.toLocaleString()} VNĐ
`);
            break;
        }

        case "2": {
            transactions = prompt(
                "Nhập chuỗi giao dịch:\nTX01:500000:SUCCESS|TX02:1200000:SUCCESS|TX03:800000:FAILED"
            );

            if (transactions === null || transactions.trim() === "") {
                transactions = "";
                console.log("Chuỗi giao dịch không được để trống!");
                break;
            }

            let start = 0;
            let totalReceived = 0;

            console.log("\n--- ĐỐI SOÁT GIAO DỊCH ---");

            while (start < transactions.length) {
                let end = transactions.indexOf("|", start);

                if (end === -1) {
                    end = transactions.length;
                }

                let transaction = transactions.slice(start, end);

                let firstColon = transaction.indexOf(":");
                let secondColon = transaction.indexOf(":", firstColon + 1);

                if (firstColon !== -1 && secondColon !== -1) {
                    let code = transaction.slice(0, firstColon);
                    let amount = Number(
                        transaction.slice(firstColon + 1, secondColon)
                    );
                    let status = transaction.slice(secondColon + 1);

                    if (
                        amount >= 0 &&
                        (status === "SUCCESS" || status === "FAILED")
                    ) {
                        console.log(
                            `${code} - ${amount.toLocaleString()} VNĐ - ${status}`
                        );

                        if (status === "SUCCESS") {
                            totalReceived += amount;
                        }
                    }
                }

                start = end + 1;
            }

            console.log("----------------------------------------");
            console.log(
                `TỔNG TIỀN THỰC THU: ${totalReceived.toLocaleString()} VNĐ`
            );

            break;
        }

        case "3": {
            if (transactions === "") {
                console.log("Chưa có dữ liệu giao dịch!");
                break;
            }

            let searchCode = prompt("Nhập mã giao dịch cần tra cứu:");

            if (searchCode === null || searchCode.trim() === "") {
                console.log("Mã giao dịch không được để trống!");
                break;
            }

            let found = false;
            let start = 0;

            while (start < transactions.length) {
                let end = transactions.indexOf("|", start);

                if (end === -1) {
                    end = transactions.length;
                }

                let transaction = transactions.slice(start, end);

                let firstColon = transaction.indexOf(":");
                let secondColon = transaction.indexOf(
                    ":",
                    firstColon + 1
                );

                if (firstColon !== -1 && secondColon !== -1) {
                    let code = transaction.slice(0, firstColon);
                    let amount = Number(
                        transaction.slice(firstColon + 1, secondColon)
                    );
                    let status = transaction.slice(secondColon + 1);

                    if (code === searchCode.trim()) {
                        console.log(`
--- KẾT QUẢ TRA CỨU ---
Mã giao dịch: ${code}
Số tiền: ${amount.toLocaleString()} VNĐ
Trạng thái: ${status}
`);

                        found = true;
                        break;
                    }
                }

                start = end + 1;
            }

            if (!found) {
                console.log("Không tìm thấy giao dịch!");
            }

            break;
        }

        case "4": {
            if (transactions === "") {
                console.log("Chưa có dữ liệu giao dịch!");
                break;
            }

            let start = 0;
            let totalReceived = 0;
            let totalFailed = 0;
            let successCount = 0;
            let failedCount = 0;

            while (start < transactions.length) {
                let end = transactions.indexOf("|", start);

                if (end === -1) {
                    end = transactions.length;
                }

                let transaction = transactions.slice(start, end);

                let firstColon = transaction.indexOf(":");
                let secondColon = transaction.indexOf(
                    ":",
                    firstColon + 1
                );

                if (firstColon !== -1 && secondColon !== -1) {
                    let amount = Number(
                        transaction.slice(firstColon + 1, secondColon)
                    );
                    let status = transaction.slice(secondColon + 1);

                    if (amount >= 0) {
                        if (status === "SUCCESS") {
                            totalReceived += amount;
                            successCount++;
                        } else if (status === "FAILED") {
                            totalFailed += amount;
                            failedCount++;
                        }
                    }
                }

                start = end + 1;
            }

            console.log(`
==================================================
             BÁO CÁO TỔNG KẾT TÀI CHÍNH
==================================================
Giao dịch SUCCESS : ${successCount}
Giao dịch FAILED  : ${failedCount}
Tiền thực thu     : ${totalReceived.toLocaleString()} VNĐ
Tiền FAILED       : ${totalFailed.toLocaleString()} VNĐ
==================================================
`);

            break;
        }

        case "0":
            isRunning = false;
            console.log("Đã thoát chương trình!");
            break;

        default:
            console.log("Lựa chọn không hợp lệ!");
            break;
    }

} while (isRunning);