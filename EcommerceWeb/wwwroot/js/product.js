﻿let dataTable;

$(document).ready(() => {
    loadDataTable();
});

const loadDataTable = () => {
    dataTable = $("#productTable").DataTable({
        ajax: {
            url: "/Admin/Product/GetAll"
        },
        columns: [
            { data: "title" },
            { data: "isbn" },
            { data: "price" },
            { data: "author" },
            { data: "category.name" },
            { data: "coverType.name" },
            {
                data: "id",
                render: (data) => {
                    return `
                    <div class="d-grid gap-2 d-md-block">
                        <a href="/Admin/Product/Upsert/${data}" class="btn btn-primary" role="button">Edit</a>
                        <a onclick="deleteProduct('/Admin/Product/Delete/${data}');" class="btn btn-danger" role="button">Delete</a>
                    </div>`;
                },
            }
        ],
    });
};

const deleteProduct = (url) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: url,
                type: "DELETE",
                success: (data) => {
                    if (data.success) {
                        dataTable.ajax.reload();
                        toastr.success(data.message);
                    } else {
                        toastr.error(data.message);
                    }
                }
            });
        }
    })
};