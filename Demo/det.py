def solve(A, b):
    m, n = len(A), len(A[0])
    if m != len(b):
        raise ValueError("Matrix and vector dimensions do not match")

    augmented_matrix = [row + [bi] for row, bi in zip(A, b)]

    # Forward elimination
    for i in range(m):
        pivot_row = augmented_matrix[i]
        pivot = pivot_row[i]

        if pivot == 0:
            # Check for row exchange
            for k in range(i + 1, m):
                if augmented_matrix[k][i] != 0:
                    augmented_matrix[i], augmented_matrix[k] = augmented_matrix[k], augmented_matrix[i]
                    break
            else:
                # No nonzero pivot found, infinite solutions
                return -2

        pivot_row = [elem / pivot for elem in pivot_row]

        for j in range(i + 1, m):
            factor = augmented_matrix[j][i]
            augmented_matrix[j] = [elem_j - factor * elem_i for elem_i, elem_j in zip(pivot_row, augmented_matrix[j])]

    # Backward substitution
    x = [0] * n
    for i in range(m - 1, -1, -1):
        x[i] = augmented_matrix[i][-1]
        for j in range(i + 1, m):
            x[i] -= augmented_matrix[i][j] * x[j]

    # Check for inconsistent system
    for i in range(m):
        if all(coeff == 0 for coeff in augmented_matrix[i][:-1]) and augmented_matrix[i][-1] != 0:
            return -1  # Inconsistent system, no solution

    return x


def det(A):
    if len(A) != len(A[0]):
        return 0  # Not a square matrix

    n = len(A)
    determinant = 1
    for i in range(n):
        pivot = A[i][i]

        if pivot == 0:
            # Check for row exchange
            for k in range(i + 1, n):
                if A[k][i] != 0:
                    A[i], A[k] = A[k], A[i]
                    determinant *= -1
                    break
            else:
                # No nonzero pivot found, determinant is 0
                return 0

        for j in range(i + 1, n):
            factor = A[j][i] / pivot
            for k in range(i, n):
                A[j][k] -= factor * A[i][k]

    for i in range(n):
        determinant *= A[i][i]

    return determinant


# Example usage
A = [[2, 1, -1],
     [-3, -1, 2],
     [-2, 1, 2]]

b = [8, -11, -3]

solution = solve(A, b)
determinant_A = det(A)

print("Solution:", solution)
print("Determinant of A:", determinant_A)
