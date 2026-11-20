<!DOCTYPE html>
<html>
<head>
    <title>Tabel Perkalian Matriks</title>
    <style>
        table {
            border-collapse: separate;
            border-spacing: 2px;
            border: 1px solid #808080;
            font-family: "Times New Roman", serif;
            font-size: 18px;
        }
        td {
            border: 1px solid #808080;
            padding: 4px 8px;
            text-align: left;
        }
        .header {
            background-color: #00FF00; /* Hijau terang */
        }
        .ganjil {
            background-color: #FFFF00; /* Kuning */
        }
        .genap {
            background-color: #00FFFF; /* Biru muda (Cyan) */
        }
    </style>
</head>
<body>

<table>
    <!-- Baris Header Pertama -->
    <tr>
        <td>bilangan</td>
        <?php
        for ($kolom = 1; $kolom <= 10; $kolom++) {
            echo "<td class='header'>$kolom</td>";
        }
        ?>
    </tr>

    <!-- Baris Isi Perkalian (1 sampai 10) -->
    <?php
    for ($baris = 1; $baris <= 10; $baris++) {
        echo "<tr>";
        // Kolom pertama di setiap baris (Header samping)
        echo "<td class='header'>$baris</td>";

        // Kolom hasil perkalian
        for ($kolom = 1; $kolom <= 10; $kolom++) {
            $hasil = $baris * $kolom;
            
            // Menentukan warna sel berdasarkan hasil ganjil atau genap
            $warna = ($hasil % 2 == 0) ? "genap" : "ganjil";
            
            echo "<td class='$warna'>$hasil</td>";
        }
        echo "</tr>";
    }
    ?>
</table>

</body>
</html>