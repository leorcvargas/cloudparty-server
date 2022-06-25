echo "Installing ingress-nginx"
helm install ingress-nginx ingress-nginx/ingress-nginx -f ./ingress-nginx-values.yaml

echo "Applying resources from ingress-nginx.yaml"
kubectl apply -f ./ingress-nginx.yaml