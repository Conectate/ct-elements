CWD="$(pwd)"
for D in `ls packages`
do
    echo "---------------- RUN ON $CWD/packages/$D --------------------"
    cd "$CWD/packages/$D"
    yarn prepare
done
cd "$CWD"