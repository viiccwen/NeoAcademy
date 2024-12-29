const dummi = [
  {
    "id": '',
    "text": "Consider a surface \( S \) given by \( z = f(x, y) \) in \( \mathbb{R}^3 \), where \( f(x, y) \) is a smooth function. What is the expression for the Gaussian curvature \( K \) of the surface at a point?",
    "options": [
      "K = 0",
      "K = \frac{f_{xx} f_{yy} - f_{xy}^2}{(1 + f_x^2 + f_y^2)^2}",
      "K = \frac{f_{xx}}{(1 + f_x^2 + f_y^2)^{3/2}}",
      "K = \frac{f_{yy}}{(1 + f_x^2 + f_y^2)^{3/2}}"
    ],
    "answer": 0,
    "createdAt": new Date(),
    "userId": ''
  },
  {
    "id": '',
    "text": "Let \( \mathbf{r}(u, v) \) be a parametric surface in \( \mathbb{R}^3 \). The first fundamental form is given by \( I = E du^2 + 2F dudv + G dv^2 \). What is the relation between the coefficients \( E, F, G \) and the partial derivatives of \( \mathbf{r}(u, v) \)?",
    "options": [
      "E = \langle \mathbf{r}_u, \mathbf{r}_u \rangle, F = \langle \mathbf{r}_u, \mathbf{r}_v \rangle, G = \langle \mathbf{r}_v, \mathbf{r}_v \rangle",
      "E = \langle \mathbf{r}_v, \mathbf{r}_v \rangle, F = \langle \mathbf{r}_u, \mathbf{r}_v \rangle, G = \langle \mathbf{r}_u, \mathbf{r}_u \rangle",
      "E = \langle \mathbf{r}_u, \mathbf{r}_v \rangle, F = \langle \mathbf{r}_u, \mathbf{r}_u \rangle, G = \langle \mathbf{r}_v, \mathbf{r}_v \rangle",
      "E = \langle \mathbf{r}_u, \mathbf{r}_v \rangle, F = \langle \mathbf{r}_v, \mathbf{r}_v \rangle, G = \langle \mathbf{r}_u, \mathbf{r}_u \rangle"
    ],
    "answer": 0,
    "createdAt": new Date(),
    "userId": '',
  }
];

export async function generateQuiz(numberOfOptions: number, category: string, difficulty: string): Promise<string> {
    return JSON.stringify(dummi);
}

export async function getAnswer(quizId: string): Promise<number | undefined> {
    return dummi.find(quiz => quiz.id == quizId)?.answer;
}
